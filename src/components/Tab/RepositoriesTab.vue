<template>
  <AppLoader :is-loading="isLoading">
    <GithubSearchInput
      v-model="searchTerm"
      class="github-search-tab"
      placeholder="Filter result"
      title="Find a repository..."
    />

    <p v-if="!isLoading && !repositories?.edges">
      {{ userProfile?.login }} doesn’t have any public repositories yet...
    </p>

    <RepoSummary
      v-else
      v-for="repo in filteredResult"
      :key="repo.node?.description"
      :repository-info="repo"
    />
  </AppLoader>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import RepoSummary from '@/components/card/RepoSummary.vue';
import GithubSearchInput from '@/components/GithubSearchInput.vue';
import AppLoader from '@/components/AppLoader.vue';
import { getRepos } from '@/composables/useRepositoryFetch';
import { useSharedStore } from '@/stores/shared';
import type { RepositorySummary, UserRepositoriesSummary } from '@/types';

const route = useRoute();
const store = useSharedStore();
const username = computed(() => route.params.username);
const repositories = ref<RepositorySummary | undefined>(undefined);
const searchTerm = ref<string>('');
const filteredResult = computed(() =>
  repositories.value?.edges.filter((repo) =>
    repo.node.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
const userProfile = computed(() => store.currentUser?.user);

const isLoading = computed(() => store.isRepoLoading);

function fetchUserRepos(userLogin: string) {
  const { variables, load, loading, onResult, onError } = getRepos();
  variables.value = {
    username: userLogin,
  };

  store.isRepoLoading = loading.value;
  load();

  onResult((queryResult: { data: UserRepositoriesSummary }) => {
    store.isRepoLoading = loading.value;
    repositories.value = queryResult?.data?.user?.repositories;

    // console.log('queryResult.networkStatus: ', queryResult.networkStatus);
    // console.log(queryResult.stale);
  });

  onError((error) => {
    console.log('error.graphQLErrors: ', error.graphQLErrors);
    console.log('error.networkError: ', error.networkError);
  });
}

fetchUserRepos(String(username.value));
</script>

<style scoped>
.github-search-tab {
  width: 50%;
}

@media only screen and (max-width: 768px) {
  .github-search-tab {
    width: 80%;
  }
}

@media only screen and (max-width: 425px) {
  .github-search-tab {
    width: 100%;
  }
}
</style>
