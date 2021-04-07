import fs from 'fs';
import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import { resolvers } from './resolvers';

const typeDefs = fs
  .readFileSync(path.join(__dirname, '../graphql/schema.graphql'), 'utf8')
  .toString();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen({ port: PORT }, () =>
chalk.magenta.bold(
  console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
);
