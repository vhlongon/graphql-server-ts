import { hot } from 'react-hot-loader';
import React from 'react';
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';
import PlanetsList from './PlanetsList';

const App = () => {
  return (
    <div>
      <FilmsList />
      <PeopleList />
      <PlanetsList />
    </div>
  );
};

export default hot(module)(App);
