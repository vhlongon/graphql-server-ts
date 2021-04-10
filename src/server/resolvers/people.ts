import fetch from 'node-fetch';
import { sortById, sortByName, transformPerson } from './../helpers';
import {
  QueryResolvers,
  QueryPeopleArgs,
  SortPeopleBy,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';
import { PersonMainData, Response } from '../types';

export const peopleResolver: QueryResolvers['people'] = async (
  _,
  { sortBy }: QueryPeopleArgs = {}
) => {
  const response = await fetch(`${REST_API}/people`);
  const data: Response<PersonMainData>[] = await response.json();
  const sorted =
    sortBy === SortPeopleBy.name ? sortByName(data) : sortById(data);

  return sorted.map(transformPerson);
};
