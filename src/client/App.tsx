import { hot } from 'react-hot-loader';
import React from 'react';
import FilmsList from './FilmsList';

const App = () => {
  return (
    <div>
      <FilmsList />
    </div>
  );
};

export default hot(module)(App);
