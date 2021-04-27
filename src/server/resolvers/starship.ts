import fetch from 'node-fetch';
import { fetchPerson, transformStarship } from './../helpers';
import { REST_API } from './../constants';
import {
  QueryFilmArgs,
  QueryResolvers,
} from '../../graphql/types/graphql-types';
import { StarshipMainData, Response } from '../types';
import graphqlFields from 'graphql-fields';

export const starshipResolver: QueryResolvers['starship'] = async (
  _,
  args: QueryFilmArgs,
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPilotsInQuery = Object.keys(fieldsInfo).includes('pilots');
  const response = await fetch(`${REST_API}/starships/${args.id}`);
  const data: Response<StarshipMainData> = await response.json();

  if (Object.keys(data).length <= 0) {
    throw new Error(`Starship with id: ${args.id} not found`);
  }

  let starship = transformStarship(data);

  if (hasPilotsInQuery && data.fields.pilots.length) {
    const pilots = await Promise.all(
      data.fields.pilots.map(async (personId: number) => {
        return await fetchPerson(personId);
      }),
    );

    starship = { ...starship, pilots };
  }

  return starship;
};
