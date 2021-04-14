import fetch from 'node-fetch';
import { PersonMainData, Response } from '../types';
import { sortById, sortByName, transformPerson } from './../helpers';
import graphqlFields from 'graphql-fields';
import {
  QueryResolvers,
  QueryPeopleArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';

export const peopleResolver: QueryResolvers['people'] = async (
  root,
  { sortBy }: QueryPeopleArgs = {},
  context,
  info,
) => {
  // check if a field has been request, like planet, then make a rest call to planets/id
  const fieldsInfo = graphqlFields(info);
  console.log(fieldsInfo);
  const response = await fetch(`${REST_API}/people`);
  const data: Response<PersonMainData>[] = await response.json();
  const sorted =
    sortBy === SortByNameOrId.name
      ? sortByName<PersonMainData>(data)
      : sortById<Response<PersonMainData>>(data);

  return sorted.map(transformPerson);
};
