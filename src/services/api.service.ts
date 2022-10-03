import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

type Headers = {
  authorization?: string;
};

//  Set header
const getHeaders = () => {
  //   const headers = {};
  const headers: Headers = {};
  //   const myToken = import.meta.env.VITE_APP_API_KEY;
  const myToken = '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';

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
