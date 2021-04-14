import React from 'react';
import {
  useGetPeopleQuery,
  SortByNameOrId,
} from '../graphql/types/graphql-types';

const PeopleList = () => {
  const { data, loading, error } = useGetPeopleQuery({
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
      <h1>SW People</h1>
      <ul>
        {data?.people?.map(({ id, name, gender, created, edited }) => (
          <li key={id}>
            <div>
              Name: {name} || {gender}
            </div>
            <div>
              created: {created} || edited: {edited}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
