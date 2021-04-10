import React from 'react';
import { useGetFilmsQuery, SortFilmsBy } from '../graphql/types/graphql-types';

const FilmsList = () => {
  const { data, loading, error } = useGetFilmsQuery({
    variables: { sortBy: SortFilmsBy.episodeId },
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
        {data?.films?.map(
          ({
            id,
            releaseDate,
            title,
            director,
            episodeId,
            created,
            edited,
          }) => (
            <li key={id}>
              <div>
                Episode: {episodeId} || {title} || {releaseDate} || {director}
              </div>
              <div>
                created: {created} || edited: {edited}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default FilmsList;
