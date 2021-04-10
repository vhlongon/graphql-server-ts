import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const isProduction = process.env.NODE_ENV === 'production';
const uri = isProduction
  ? `${process.env.API_URL}/graphql`
  : `${process.env.API_URL}:${process.env.PORT}/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

const root = document.getElementById('root');
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root,
);
