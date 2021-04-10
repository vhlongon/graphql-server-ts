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
  hair_color: string[];
  height: number;
  mass: number;
  name: string;
  skin_Color: string[];
};

export type Response<T> = {
  fields: T;
  id: number;
};
