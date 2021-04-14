import React from 'react';
import {
  SortByNameOrId,
  useGetPlanetsQuery,
} from '../graphql/types/graphql-types';

const PlanetsList = () => {
  const { data, loading, error } = useGetPlanetsQuery({
    variables: { sortBy: SortByNameOrId.name },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>SW Planets</h1>
      <ul>
        {data?.planets?.map(({ id, name, population }) => (
          <li key={id}>
            <div>
              Name: {name} || Population: {population}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetsList;
