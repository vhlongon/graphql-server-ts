import { PlanetMainData, Response } from './../types';
import fetch from 'node-fetch';
import { sortById, sortByName, transformPlanet } from './../helpers';
import {
  QueryResolvers,
  QueryPeopleArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';

export const planetsResolver: QueryResolvers['planets'] = async (
  _,
  { sortBy }: QueryPeopleArgs = {},
) => {
  const response = await fetch(`${REST_API}/planets`);
  const data: Response<PlanetMainData>[] = await response.json();
  const sorted =
    sortBy === SortByNameOrId.name
      ? sortByName<PlanetMainData>(data)
      : sortById<Response<PlanetMainData>>(data);

  return sorted.map(transformPlanet);
};
