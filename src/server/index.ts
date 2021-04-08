import 'graphql-import-node';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import { resolvers } from './resolvers';
import typeDefs from '../graphql/schema.gql';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen({ port: process.env.PORT || PORT }, () =>
  console.log(
    chalk.magenta.bold(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
);
