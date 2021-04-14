module.exports = {
  client: {
    service: {
      name: 'api',
      url: 'http://localhost:4000/graphql',
    },
    excludes: [
      '**/graphql/schema.gql',
      '**/graphql/types/graphql-types.ts',
      '**/node_modules/**/*',
      '**/__tests___/**/*',
      '**/dist/**/*',
    ],
  },
};
