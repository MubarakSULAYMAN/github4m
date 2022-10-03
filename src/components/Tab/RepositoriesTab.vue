<template>
  <div>
    <input
      type="text"
      name="repository-search"
      id="repository-search"
      placeholder="Find a repository..."
    />

    <p v-if="!store.isLoading && !!repositories?.edges">No repo found for this user.</p>

    <RepoSummary
      v-else
      v-for="repo in repositories?.edges"
      :key="repo.node?.description"
      :repository-info="repo"
    />
  </div>
</template>

<script setup lang="ts">
import RepoSummary from '@/components/card/RepoSummary.vue';
import { getRepos } from '@/composables/useRepositoryFetch';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSharedStore } from '@/stores/shared';
import type { RepositorySummary, UserRepositoriesSummary } from '@/types';

const route = useRoute();
const store = useSharedStore();
const username = computed(() => route.params.username);
const repositories = ref<RepositorySummary | undefined>(undefined);

function fetchUserProfile(userLogin: string) {
  const { variables, load, onResult, onError } = getRepos();
  console.log('userLogin');
  variables.value = {
    username: userLogin,
  };
  load();
  store.loading();

  onResult((queryResult: { data: UserRepositoriesSummary }) => {
    store.done();
    repositories.value = queryResult?.data?.user?.repositories;

    // console.log('queryResult.networkStatus: ', queryResult.networkStatus);
    // console.log(queryResult.stale);
  });

  onError((error) => {
    console.log('error.graphQLErrors: ', error.graphQLErrors);
    console.log('error.networkError: ', error.networkError);
  });
}

fetchUserProfile(String(username.value) || 'MubarakSULAYMAN');
console.log(username.value);
</script>

<style scoped>
#repository-search {
  width: 50%;
  margin: 20px 0;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
}

#repository-search:focus {
  border: 2px solid var(--gh4-blue);
}

@media only screen and (max-width: 768px) {
  #repository-search {
    width: 80%;
  }
}

@media only screen and (max-width: 425px) {
  #repository-search {
    width: 100%;
  }
}
</style>
