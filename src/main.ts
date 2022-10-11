import { createApp, h, provide } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '@/services/api.service';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

provideApolloClient(apolloClient);

app.use(createPinia());
app.use(router);

// app.config.globalProperties.$dayjs = dayjs;
// app.directive('dayjs', {
//   /* custom directive hooks */
// });

app.mount('#app');

// router.isReady().then(() => {
//   app.mount('#app');
// });
