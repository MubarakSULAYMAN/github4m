import { defineStore } from 'pinia';

type Store = {
  searchTerm: string;
};

export const useSharedStore = defineStore('shared', {
  state: (): Store => ({
    searchTerm: '',
  }),
});
