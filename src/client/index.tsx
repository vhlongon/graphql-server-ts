import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: `${process.env.API_URL}:${process.env.PORT}/graphql`,
  cache: new InMemoryCache(),
});

const root = document.getElementById('root');
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root
);
