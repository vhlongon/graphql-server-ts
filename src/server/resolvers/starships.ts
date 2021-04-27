import fetch from 'node-fetch';
import { StarshipMainData, Response } from '../types';
import { sortById, sortByClass, transformStarship } from './../helpers';
import graphqlFields from 'graphql-fields';
import {
  QueryResolvers,
  QueryStarshipsArgs,
  SortStarshipBy,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';
import { personResolver } from './person';

export const starshipsResolver: QueryResolvers['starships'] = async (
  _,
  { sortBy }: QueryStarshipsArgs = {},
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPilotsInQuery = Object.keys(fieldsInfo).includes('pilots');
  const response = await fetch(`${REST_API}/starships`);
  const data: Response<StarshipMainData>[] = await response.json();
  const sorted =
    sortBy === SortStarshipBy.class
      ? sortByClass<StarshipMainData>(data)
      : sortById<Response<StarshipMainData>>(data);

  if (hasPilotsInQuery) {
    return await Promise.all(
      sorted.map(async (starship) => {
        const pilots = await Promise.all(
          starship.fields.pilots.map(async (personId: number) => {
            return await personResolver(_, { id: personId }, context, info);
          }),
        );
        return {
          ...transformStarship(starship),
          pilots,
        };
      }),
    );
  }

  return sorted.map(transformStarship);
};
