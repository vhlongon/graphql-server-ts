import React from 'react';
import { useGetFilmsQuery } from '../graphql/types/graphql-types';

const FilmsList = () => {
  const { data, loading, error } = useGetFilmsQuery();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>SW Movies</h1>
      <ul>
        {data?.films?.map(({ id, releaseDate }) => (
          <li key={id}>
            Id: {id} - Release Date: {releaseDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmsList;
