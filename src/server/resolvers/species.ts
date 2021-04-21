import { Response, SpeciesMainData } from './../types';
import fetch from 'node-fetch';
import { sortById, sortByName, transformSpecies } from './../helpers';
import {
  QueryResolvers,
  QuerySpeciesArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';

export const speciesResolver: QueryResolvers['species'] = async (
  _,
  { input }: QuerySpeciesArgs = {},
) => {
  if (input?.id) {
    const response = await fetch(`${REST_API}/species/${input.id}`);
    const species: Response<SpeciesMainData> = await response.json();

    return [transformSpecies(species)];
  }
  const response = await fetch(`${REST_API}/species`);
  const data: Response<SpeciesMainData>[] = await response.json();

  const sorted =
    input?.sortBy === SortByNameOrId.name
      ? sortByName<SpeciesMainData>(data)
      : sortById<Response<SpeciesMainData>>(data);

  return sorted.map(transformSpecies);
};
