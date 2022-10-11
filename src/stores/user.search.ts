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
    fetchUsers(userLogin: string) {
      const store = useSharedStore();
      const { variables, load, loading, onResult, onError } = getUsers();
      variables.value = {
        username: userLogin,
      };

      store.isLoading = loading.value;
      load();

      onResult((queryResult: { data: Users }) => {
        store.isLoading = loading.value;
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
