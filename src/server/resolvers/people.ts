import fetch from 'node-fetch';
import { PersonMainData, Response } from '../types';
import { sortById, sortByName, transformPerson } from './../helpers';
import {
  QueryResolvers,
  QueryPeopleArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';

export const peopleResolver: QueryResolvers['people'] = async (
  _,
  { sortBy }: QueryPeopleArgs = {},
) => {
  const response = await fetch(`${REST_API}/people`);
  const data: Response<PersonMainData>[] = await response.json();
  const sorted =
    sortBy === SortByNameOrId.name
      ? sortByName<PersonMainData>(data)
      : sortById<Response<PersonMainData>>(data);

  return sorted.map(transformPerson);
};
