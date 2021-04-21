export type FilmMainData = {
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: string;
  title: string;
};

export type PersonMainData = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string | string[];
  height: string;
  homeworld: number;
  mass: string;
  name: string;
  skin_Color: string | string[];
};

export type SpeciesMainData = {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string | string[];
  hair_colors: string | string[];
  homeworld?: number;
  language: string;
  name: string;
  skin_colors: string | string[];
};

export type PlanetMainData = {
  climate: string[];
  created: string;
  diameter: string;
  edited: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string[];
};

export type Response<T> = {
  fields: T;
  id: number;
};
