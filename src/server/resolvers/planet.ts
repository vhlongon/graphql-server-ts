import { transformPlanet } from './../helpers';
import fetch from 'node-fetch';
import { REST_API } from './../constants';
import {
  QueryFilmArgs,
  QueryResolvers,
} from '../../graphql/types/graphql-types';
import { PlanetMainData, Response } from '../types';

export const planetResolver: QueryResolvers['planet'] = async (
  _,
  args: QueryFilmArgs,
) => {
  const response = await fetch(`${REST_API}/planets/${args.id}`);
  const data: Response<PlanetMainData> = await response.json();

  if (Object.keys(data).length <= 0) {
    throw new Error(`Planet with id: ${args.id} not found`);
  }

  return transformPlanet(data);
};
