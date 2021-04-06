import fetch from 'node-fetch';
import {
  Film,
  QueryFilmArgs,
  QueryFilmsArgs,
  Resolvers,
} from '../graphql/types/graphql-types';

const SWAPI = 'https://star-wars-api.herokuapp.com/films';

type FilmMainData = {
  producer: string;
  release_date: string;
  opening_crawl: string;
  episode_id: number;
  title: string;
};

type Response = {
  fields: FilmMainData;
};
const transformFilm = ({
  producer,
  release_date,
  opening_crawl,
  episode_id,
  title,
}: FilmMainData): Omit<Film, '__typename'> => ({
  producer,
  title,
  id: episode_id,
  releaseDate: release_date,
  openingCrawl: opening_crawl,
});

export const resolvers: Resolvers = {
  Query: {
    films: async (_, { sortBy }: QueryFilmsArgs = {}) => {
      const response = await fetch(SWAPI);
      const data = await response.json();
      const r = data.map(({ fields }: Response) => transformFilm(fields));

      // TODO sorty by correctly
      return r;
    },
    film: async (_, args: QueryFilmArgs) => {
      const response = await fetch(SWAPI);
      const data = await response.json();

      const selectedFilm = data.find(
        ({ fields }: any) => fields.episode_id === args.id
      );

      if (!selectedFilm) {
        throw new Error(`film with id: ${args.id} not found`);
      }

      return transformFilm(selectedFilm.fields);
    },
  },
};
