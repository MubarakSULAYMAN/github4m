module.exports = {
  client: {
    service: {
      name: 'github4m',
      // URL to the GraphQL API
      // url: import.meta.env.VITE_GRAPHQL_URL,
      // url: process.env.VITE_GRAPHQL_URL,
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
};
