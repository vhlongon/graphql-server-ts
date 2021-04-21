import { planetsResolver } from './planets';
import { Resolvers } from '../../graphql/types/graphql-types';
import { filmsResolver } from './films';
import { DateTimeResolver } from 'graphql-scalars';
import { filmResolver } from './film';
import { peopleResolver } from './people';
import { personResolver } from './person';
import { planetResolver } from './planet';
import { speciesResolver } from './species';

export const resolvers: Resolvers = {
  Date: DateTimeResolver,
  Query: {
    films: filmsResolver,
    film: filmResolver,
    people: peopleResolver,
    person: personResolver,
    planets: planetsResolver,
    planet: planetResolver,
    species: speciesResolver,
  },
};
