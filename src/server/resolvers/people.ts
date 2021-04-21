import fetch from 'node-fetch';
import { PersonMainData, PlanetMainData, Response } from '../types';
import {
  sortById,
  sortByName,
  transformPerson,
  transformPlanet,
} from './../helpers';
import graphqlFields from 'graphql-fields';
import {
  QueryResolvers,
  QueryPeopleArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';

export const peopleResolver: QueryResolvers['people'] = async (
  _,
  { sortBy }: QueryPeopleArgs = {},
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPlanetInQuery = Object.keys(fieldsInfo).includes('homeworld');
  const response = await fetch(`${REST_API}/people`);
  const people: Response<PersonMainData>[] = await response.json();
  const sorted =
    sortBy === SortByNameOrId.name
      ? sortByName<PersonMainData>(people)
      : sortById<Response<PersonMainData>>(people);

  if (hasPlanetInQuery) {
    return await Promise.all(
      sorted.map(async (person) => {
        const { homeworld } = person.fields;
        const response = await fetch(`${REST_API}/planets/${homeworld}`);
        const planet: Response<PlanetMainData> = await response.json();
        return {
          ...transformPerson(person),
          homeworld: transformPlanet(planet),
        };
      }),
    );
  }

  return sorted.map(transformPerson);
};
