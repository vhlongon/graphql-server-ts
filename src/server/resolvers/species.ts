import {
  PersonMainData,
  PlanetMainData,
  Response,
  SpeciesMainData,
} from './../types';
import fetch from 'node-fetch';
import {
  sortById,
  sortByName,
  transformPerson,
  transformPlanet,
  transformSpecies,
} from './../helpers';
import {
  Person,
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

const fetchPerson = async (id?: number): Promise<Person | null> => {
  if (!id) {
    return null;
  }
  const response = await fetch(`${REST_API}/people/${id}`);
  const personData: Response<PersonMainData> = await response.json();
  return transformPerson(personData);
};

export const speciesResolver: QueryResolvers['species'] = async (
  _,
  { input }: QuerySpeciesArgs = {},
  context,
  info,
) => {
  const fieldsInfo = graphqlFields(info);
  const hasPlanetInQuery = Object.keys(fieldsInfo).includes('homeworld');
  const hasPeopleInQuery = Object.keys(fieldsInfo).includes('people');

  if (input?.id) {
    const response = await fetch(`${REST_API}/species/${input.id}`);
    const data: Response<SpeciesMainData> = await response.json();

    if (Object.keys(data).length <= 0) {
      throw new Error(`Species with id: ${input.id} not found`);
    }

    // initially only add the transformed data for person
    let singleSpecies = transformSpecies(data);

    // when the planet is request add to the response
    if (hasPlanetInQuery) {
      const homeworld = await fetchPlanet(data.fields.homeworld);
      singleSpecies = { ...singleSpecies, homeworld };
    }

    // when the people is request add to the response
    if (hasPeopleInQuery) {
      const people = await Promise.all(
        data.fields.people.map(async (personId) => {
          return await fetchPerson(personId);
        }),
      );

      singleSpecies = { ...singleSpecies, people };
    }

    return [singleSpecies];
  }

  const response = await fetch(`${REST_API}/species`);
  const data: Response<SpeciesMainData>[] = await response.json();
  const sorted =
    input?.sortBy === SortByNameOrId.name
      ? sortByName<SpeciesMainData>(data)
      : sortById<Response<SpeciesMainData>>(data);

  // same as above but first scenario is a list of all transformed species
  let multipleSpecies = sorted.map(transformSpecies);

  // when the planet is required add it for each species
  if (hasPlanetInQuery) {
    const speciesWithPlanets = await Promise.all(
      sorted.map(async (species) => {
        const homeworld = await fetchPlanet(species.fields.homeworld);
        return { ...transformSpecies(species), homeworld };
      }),
    );

    // finally return the final object containing the requested fields
    multipleSpecies = speciesWithPlanets;
  }

  // here is a bit more complex since besides iterating over each species
  // we also have to iterate over each person in people field for that species
  if (hasPeopleInQuery) {
    const peopleForAllSpecies = await Promise.all(
      sorted.map(async (species) => {
        const people = await Promise.all(
          species.fields.people.map(async (personId) => {
            return await fetchPerson(personId);
          }),
        );
        return { id: species.id, people };
      }),
    );

    const speciesWithPeople = multipleSpecies.map((species) => {
      const people = peopleForAllSpecies.find(({ id }) => id === species.id)
        ?.people;
      return {
        ...species,
        people,
      };
    });

    // finally return the final object containing the requested fields
    // species and/or people and planets
    multipleSpecies = speciesWithPeople;
  }

  return multipleSpecies;
};
