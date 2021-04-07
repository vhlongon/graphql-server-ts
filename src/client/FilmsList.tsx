import React from 'react';
import { useGetFilmsQuery, SortBy } from '../graphql/types/graphql-types';

const FilmsList = () => {
  const { data, loading, error } = useGetFilmsQuery({
    variables: { sortBy: SortBy.ReleaseDate },
  });

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
        {data?.films?.map(({ id, releaseDate, title, director }) => (
          <li key={id}>
            Episode: {id} || {title} || {releaseDate} || {director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmsList;
