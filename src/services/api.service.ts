import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

type Headers = {
  authorization?: string;
};

//  Set header
const getHeaders = () => {
  const headers: Headers = {};
  const myToken = import.meta.env.VITE_API_KEY;

  if (myToken) {
    headers.authorization = `Bearer ${myToken}`;
  }

  return headers;
};

// Cache implementation
const cache = new InMemoryCache();
const uri = import.meta.env.VITE_API_URL;

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri,
  fetch,
  headers: getHeaders(),
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export { apolloClient };
