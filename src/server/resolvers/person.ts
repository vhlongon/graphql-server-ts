import { PlanetMainData } from './../types';
import { transformPerson, transformPlanet } from './../helpers';
import fetch from 'node-fetch';
import { REST_API } from './../constants';
import {
  QueryFilmArgs,
  QueryResolvers,
} from '../../graphql/types/graphql-types';
import { PersonMainData, Response } from '../types';
import graphqlFields from 'graphql-fields';

export const personResolver: QueryResolvers['person'] = async (
  _,
  args: QueryFilmArgs,
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPlanetInQuery = Object.keys(fieldsInfo).includes('homeworld');

  const response = await fetch(`${REST_API}/people/${args.id}`);
  const data: Response<PersonMainData> = await response.json();

  if (Object.keys(data).length <= 0) {
    throw new Error(`Person with id: ${args.id} not found`);
  }

  const person = transformPerson(data);

  if (hasPlanetInQuery) {
    const planetId = data.fields.homeworld;
    const response = await fetch(`${REST_API}/planets/${planetId}`);
    const planetData: Response<PlanetMainData> = await response.json();

    return { ...person, homeworld: transformPlanet(planetData) };
  }

  return person;
};
