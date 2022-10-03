import { defineStore } from 'pinia';
import type { UserProfileSummary } from '@/types';

type Store = {
  error: string | undefined | null;
  isLoading: boolean;
  searchTerm: string;
  // searchLoading: boolean;
  // searchError: ApolloError | null;
  // searchResult: any;
  currentUser: UserProfileSummary | undefined;
};

export const useSharedStore = defineStore('shared', {
  state: (): Store => ({
    error: null,
    isLoading: false,
    searchTerm: '',
    currentUser: undefined,
  }),

  actions: {
    loading() {
      this.isLoading = true;
    },
    done() {
      this.isLoading = false;
    },
    // eslint-disable-next-line
    setError(error: any) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        message = error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message = 'Empty response';
      } else {
        // Something happened in setting up the request that triggered an Error
        message = error.message;
      }
      this.error = message;
    },
    clearError() {
      this.error = null;
    },
  },
});
