import fetch from 'node-fetch';
import { REST_API } from './../constants';
import {
  QueryFilmArgs,
  QueryResolvers,
} from '../../graphql/types/graphql-types';
import { transformFilm } from '../helpers';
import { FilmMainData, Response } from '../types';

export const filmResolver: QueryResolvers['film'] = async (
  _,
  args: QueryFilmArgs,
) => {
  const response = await fetch(`${REST_API}/films/${args.id}`);
  const data: Response<FilmMainData> = await response.json();

  if (Object.keys(data).length <= 0) {
    throw new Error(`film with id: ${args.id} not found`);
  }

  return transformFilm(data);
};
