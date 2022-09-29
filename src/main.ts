import { createApp, h, provide } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  //   uri: "https://rickandmortyapi.com/graphql",
  uri: import.meta.env.VITE_API_URL,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(createPinia());
app.use(router);

app.mount('#app');
