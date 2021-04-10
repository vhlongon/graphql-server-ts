import { Resolvers } from '../../graphql/types/graphql-types';
import { filmsResolver } from './films';
import { DateTimeResolver } from 'graphql-scalars';
import { filmResolver } from './film';
import { peopleResolver } from './people';
import { personResolver } from './person';

export const resolvers: Resolvers = {
  Date: DateTimeResolver,
  Query: {
    films: filmsResolver,
    film: filmResolver,
    people: peopleResolver,
    person: personResolver,
  },
};
