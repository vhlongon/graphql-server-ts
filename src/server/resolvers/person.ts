import { transformPerson } from './../helpers';
import fetch from 'node-fetch';
import { REST_API } from './../constants';
import {
  QueryFilmArgs,
  QueryResolvers,
} from '../../graphql/types/graphql-types';
import { PersonMainData, Response } from '../types';

export const personResolver: QueryResolvers['person'] = async (
  _,
  args: QueryFilmArgs,
) => {
  const response = await fetch(`${REST_API}/people`);
  const data: Response<PersonMainData>[] = await response.json();
  const selectedPerson = data.find(({ id }) => id === args.id);

  if (!selectedPerson) {
    throw new Error(`Person with id: ${args.id} not found`);
  }

  return transformPerson(selectedPerson);
};
