import fetch from 'node-fetch';
import {
  QueryFilmsArgs,
  QueryResolvers,
  SortFilmsBy,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';
import { sortByEpisode, sortByReleaseDate, transformFilm } from '../helpers';
import { FilmMainData, Response } from '../types';

export const filmsResolver: QueryResolvers['films'] = async (
  _,
  { sortBy }: QueryFilmsArgs = {}
) => {
  const response = await fetch(`${REST_API}/films`);
  const data: Response<FilmMainData>[] = await response.json();
  const sorted =
    sortBy === SortFilmsBy.releaseDate
      ? sortByReleaseDate(data)
      : sortByEpisode(data);

  return sorted.map(transformFilm);
};
