import {
  Film,
  Gender,
  Person,
  Planet,
  Species,
} from '../graphql/types/graphql-types';
import {
  FilmMainData,
  PersonMainData,
  Response,
  PlanetMainData,
  SpeciesMainData,
} from './types';

export const sortByReleaseDate = (
  data: Response<FilmMainData>[],
): Response<FilmMainData>[] =>
  data.sort(
    (a, b) =>
      new Date(a.fields.release_date).getTime() -
      new Date(b.fields.release_date).getTime(),
  );

export const sortByEpisode = (
  data: Response<FilmMainData>[],
): Response<FilmMainData>[] =>
  data.sort((a, b) => a.fields.episode_id - b.fields.episode_id);

interface WithName {
  name: string;
}
export const sortByName = <T extends WithName>(
  data: Response<T>[],
): Response<T>[] =>
  data.sort((a, b) =>
    a.fields.name.toLowerCase().localeCompare(b.fields.name.toLowerCase()),
  );

interface WithId {
  id: number;
}

export const sortById = <T extends WithId>(data: T[]): T[] =>
  data.sort((a, b) => a.id - b.id);

export const transformFilm = ({
  fields: { created, edited, episode_id, opening_crawl, release_date, ...rest },
  id,
}: Response<FilmMainData>): Film => ({
  episodeId: episode_id,
  releaseDate: release_date,
  openingCrawl: opening_crawl,
  created: new Date(created),
  edited: new Date(edited),
  ...rest,
  id,
});

const isValidString = (input: string): boolean =>
  !['unknown', 'n/a', 'none'].includes(input);

const transformToValidStringOrNull = (input: string): string | null =>
  isValidString(input) ? input : null;

const transformToArrayOrNull = (input: unknown): [] | string[] | null => {
  if (Array.isArray(input)) {
    return input;
  }

  if (typeof input === 'string') {
    return isValidString(input) ? null : input.split(',').map((s) => s.trim());
  }

  return null;
};

const transformToNumberOrNull = (input: unknown): number | null => {
  if (typeof input === 'number') {
    return input;
  }

  if (typeof input === 'string') {
    const num = parseFloat(input);
    const isNumeric = !isNaN(num) && isFinite(num);
    return isNumeric ? Number(input) : null;
  }

  return null;
};

export const transformPerson = ({
  fields: {
    birth_year,
    created,
    edited,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_Color,
  },
  id,
}: Response<PersonMainData>): Person => ({
  birthYear: birth_year,
  created: new Date(created),
  edited: new Date(edited),
  eyeColor: eye_color,
  gender: Gender[gender as keyof typeof Gender],
  hairColor: transformToArrayOrNull(hair_color),
  height: transformToNumberOrNull(height),
  mass: transformToNumberOrNull(mass),
  skinColor: transformToArrayOrNull(skin_Color),
  name,
  id,
});

export const transformSpecies = ({
  fields: {
    average_height,
    average_lifespan,
    classification,
    created,
    designation,
    edited,
    eye_colors,
    hair_colors,
    language,
    name,
    skin_colors,
  },
  id,
}: Response<SpeciesMainData>): Species => ({
  averageHeight: transformToNumberOrNull(average_height),
  averageLifespan: transformToNumberOrNull(average_lifespan),
  created: new Date(created),
  edited: new Date(edited),
  hairColors: transformToArrayOrNull(hair_colors),
  eyeColors: transformToArrayOrNull(eye_colors),
  skinColors: transformToArrayOrNull(skin_colors),
  classification,
  designation,
  language: transformToValidStringOrNull(language),
  name,
  id,
});

export const transformPlanet = ({
  fields: {
    climate,
    created,
    diameter,
    edited,
    gravity,
    name,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    terrain,
  },
  id,
}: Response<PlanetMainData>): Planet => ({
  climate: transformToArrayOrNull(climate),
  created: new Date(created),
  diameter: transformToNumberOrNull(diameter),
  edited: new Date(edited),
  gravity: transformToNumberOrNull(gravity),
  name,
  orbitalPeriod: transformToNumberOrNull(orbital_period),
  population: transformToNumberOrNull(population),
  rotationPeriod: transformToNumberOrNull(rotation_period),
  surfaceWater: transformToNumberOrNull(surface_water),
  terrain: transformToArrayOrNull(terrain),
  id,
});
