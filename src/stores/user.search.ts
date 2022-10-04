import { defineStore } from 'pinia';
import { useSharedStore } from '@/stores/shared';
import type { UserInfo } from '@/types';
import { getUsers } from '@/composables/useUserFetch';

export type UserEdges = {
  node: UserInfo;
};

type Search = {
  userCount: number;
  edges: Partial<UserEdges[]>;
};

type Users = {
  search: Partial<Search>;
};

type Store = {
  users: Users | null;
};

export const useUserSearchStore = defineStore('search-user', {
  state: (): Store => ({
    users: null,
  }),

  actions: {
    fetchUser(userLogin: string) {
      const store = useSharedStore();
      const { variables, load, onResult, onError } = getUsers();
      variables.value = {
        username: userLogin,
      };
      load();
      store.loading();

      onResult((queryResult: { data: Users }) => {
        store.done();
        this.users = queryResult.data;

        // console.log('queryResult.networkStatus: ', queryResult.networkStatus);
        // console.log(queryResult.stale);
      });

      onError((error) => {
        console.log('error.graphQLErrors: ', error.graphQLErrors);
        console.log('error.networkError: ', error.networkError);
      });
    },
  },
});
