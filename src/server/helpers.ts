import { Film, Gender, Person } from '../graphql/types/graphql-types';
import { FilmMainData, PersonMainData, Response } from './types';

export const sortByReleaseDate = (
  data: Response<FilmMainData>[]
): Response<FilmMainData>[] =>
  data.sort(
    (a, b) =>
      new Date(a.fields.release_date).getTime() -
      new Date(b.fields.release_date).getTime()
  );

export const sortByEpisode = (
  data: Response<FilmMainData>[]
): Response<FilmMainData>[] =>
  data.sort((a, b) => a.fields.episode_id - b.fields.episode_id);

export const sortByName = (
  data: Response<PersonMainData>[]
): Response<PersonMainData>[] =>
  data.sort((a, b) =>
    a.fields.name.toLowerCase().localeCompare(b.fields.name.toLowerCase())
  );

export const sortById = (
  data: Response<PersonMainData>[]
): Response<PersonMainData>[] => data.sort((a, b) => a.id - b.id);

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

const transformToArrayOrNull = (input: unknown): [] | string[] | null => {
  if (Array.isArray(input)) {
    return input;
  }

  if (
    typeof input === 'string' &&
    input !== 'unknow' &&
    input !== 'n/a' &&
    input !== 'none'
  ) {
    return [input];
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
    skin_Color,
    ...rest
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
  ...rest,
  id,
});
