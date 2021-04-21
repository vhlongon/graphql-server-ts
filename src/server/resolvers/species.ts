import { PlanetMainData, Response, SpeciesMainData } from './../types';
import fetch from 'node-fetch';
import {
  sortById,
  sortByName,
  transformPlanet,
  transformSpecies,
} from './../helpers';
import {
  Planet,
  QueryResolvers,
  QuerySpeciesArgs,
  SortByNameOrId,
} from '../../graphql/types/graphql-types';
import { REST_API } from '../constants';
import graphqlFields from 'graphql-fields';

const fetchPlanet = async (id?: number): Promise<Planet | null> => {
  if (!id) {
    return null;
  }
  const response = await fetch(`${REST_API}/planets/${id}`);
  const planetData: Response<PlanetMainData> = await response.json();
  return transformPlanet(planetData);
};

export const speciesResolver: QueryResolvers['species'] = async (
  _,
  { input }: QuerySpeciesArgs = {},
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPlanetInQuery = Object.keys(fieldsInfo).includes('homeworld');

  if (input?.id) {
    const response = await fetch(`${REST_API}/species/${input.id}`);
    const data: Response<SpeciesMainData> = await response.json();

    if (Object.keys(data).length <= 0) {
      throw new Error(`Species with id: ${input.id} not found`);
    }

    const species = transformSpecies(data);

    if (hasPlanetInQuery) {
      const homeworld = await fetchPlanet(data.fields.homeworld);
      return [{ ...species, homeworld }];
    }

    return [species];
  }

  const response = await fetch(`${REST_API}/species`);
  const data: Response<SpeciesMainData>[] = await response.json();
  const sorted =
    input?.sortBy === SortByNameOrId.name
      ? sortByName<SpeciesMainData>(data)
      : sortById<Response<SpeciesMainData>>(data);

  if (hasPlanetInQuery) {
    return await Promise.all(
      sorted.map(async (species) => {
        const homeworld = await fetchPlanet(species.fields.homeworld);
        return { ...transformSpecies(species), homeworld };
      }),
    );
  }

  return sorted.map(transformSpecies);
};
