import { hot } from 'react-hot-loader';
import React from 'react';
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';

const App = () => {
  return (
    <div>
      <FilmsList />
      <PeopleList />
    </div>
  );
};

export default hot(module)(App);
