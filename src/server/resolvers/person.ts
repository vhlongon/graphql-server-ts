import { PlanetMainData, Context, Root } from './../types';
import {
  transformPerson,
  transformPlanet,
  hasOwnDeepProperty,
} from './../helpers';
import fetch from 'node-fetch';
import { REST_API } from './../constants';
import { Person, QueryPersonArgs } from '../../graphql/types/graphql-types';
import { PersonMainData, Response } from '../types';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

export const personResolver = async (
  root: Root,
  args: QueryPersonArgs,
  context: Context,
  info: GraphQLResolveInfo,
): Promise<Person> => {
  const fieldsInfo = graphqlFields(info);
  const hasPlanetInQuery = hasOwnDeepProperty(fieldsInfo, 'homeworld');
  const response = await fetch(`${REST_API}/people/${args.id}`);
  const data: Response<PersonMainData> = await response.json();

  if (Object.keys(data).length <= 0) {
    throw new Error(`Person with id: ${args.id} not found`);
  }

  const person = transformPerson(data);

  if (hasPlanetInQuery) {
    const { homeworld } = data.fields;
    const response = await fetch(`${REST_API}/planets/${homeworld}`);
    const planetData: Response<PlanetMainData> = await response.json();

    return { ...person, homeworld: transformPlanet(planetData) };
  }

  return person;
};
