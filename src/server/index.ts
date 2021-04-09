import 'graphql-import-node';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import typeDefs from '../graphql/schema.gql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at ${process.env.API_URL}:${process.env.PORT}${server.graphqlPath}`
  )
);
