import 'graphql-import-node';
import path from 'path';
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

if (process.env.NODE_ENV === 'production') {
  app.use('/public', express.static(path.join(__dirname, '../public')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at ${process.env.API_URL}:${process.env.PORT}${server.graphqlPath}`
  )
);
