<template>
  <AppLoader :is-loading="isLoading">
    <section class="search-home" v-if="!queryTerm">
      <div class="search-note">
        <IconHandLense />
        <p>Search more than <b>99M</b> users</p>
      </div>

      <div class="search-area">
        <GithubSearchInput
          v-model="store.searchTerm"
          @search="getUser"
          placeholder="Search GitHub"
          class="github-search-home"
        />
        <button class="search-button" @click="getUser">Search</button>
      </div>

      <p class="protip"><b>ProTip!</b> For an advanced search, use some of our prefixes</p>
    </section>

    <div class="main-content" v-else>
      <GithubSearchInput
        v-model="store.searchTerm"
        @search="getUser"
        placeholder="Search GitHub"
        class="github-search-result"
      />

      <SearchResultNav :users-count="usersCount" />

      <section>
        <p class="count">
          {{ usersCount?.toLocaleString(userLocale) || 0 }}
          <span v-if="usersCount! > 1">users</span>
          <span v-else>user</span>
        </p>

        <p class="no-user" v-if="!usersCount">No user found</p>

        <SearchSummaryCard v-for="user in users" :key="user?.node.login" :user-info="user?.node" />
      </section>
    </div>
  </AppLoader>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSharedStore } from '@/stores/shared';
import { useUserSearchStore } from '@/stores/user.search';
import IconHandLense from '@/components/icons/IconHandLense.vue';
import SearchResultNav from '@/components/navigation/SearchResultNav.vue';
import SearchSummaryCard from '@/components/card/SearchSummaryCard.vue';
import GithubSearchInput from '@/components/GithubSearchInput.vue';
import AppLoader from '@/components/AppLoader.vue';
import { userLocale } from '@/utils';

const store = useSharedStore();
const route = useRoute();
const router = useRouter();
const storeSearch = useUserSearchStore();
const isLoading = computed(() => store.isLoading);
const queryTerm = computed(() => route.query.q);

const usersCount = computed(() => storeSearch.users?.search.userCount || 12345667890);
const users = computed(() =>
  storeSearch.users?.search.edges?.filter((user) => user?.node.__typename === 'User')
);

function getUser() {
  storeSearch.fetchUsers(String(queryTerm.value));

  router.replace({
    name: 'search-result',
    query: {
      q: queryTerm.value,
      type: 'users',
    },
  });
}

if (queryTerm.value) {
  getUser();
}

watch(
  () => route.fullPath,
  () => {
    if (queryTerm.value) {
      getUser();
    }
  }
);
</script>

<style scoped>
.search-home {
  width: 70%;
  margin: auto;
  padding: 4rem 0;
}

.search-note,
.search-area {
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
}

.search-area {
  flex-wrap: wrap;
}

.search-note {
  font-size: 24px;
  color: var(--color-text);
}

.search-note svg {
  margin-right: 12px;
}

b {
  font-weight: 600;
}

.github-search-home {
  width: calc(90% - 12px);
  padding: 7px 12px;
  font-size: 16px;
  margin-right: 12px;
}

.search-button {
  width: 10%;
  margin: 12px 0;
  padding: 8px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background-color: var(--gh4-gray-4);
}

.search-button:hover {
  background-color: var(--gh4-gray-1);
}

.main-content {
  display: grid;
  grid-template-columns: 2fr 5fr;
  width: 70%;
  margin: 20px auto;
  gap: 2rem;
}

.main-content .count {
  font-size: 20px;
  font-weight: 600;
}

.github-search-result {
  display: none;
  width: 100%;
  padding: 6px 12px;
  font-size: 14px;
}

.no-user {
  padding-top: 12px;
  border-top: 1px solid var(--color-border-hover);
}

@media only screen and (max-width: 768px) {
  .main-content {
    width: 90%;
  }
}

@media only screen and (max-width: 425px) {
  .search-home {
    width: 90%;
  }

  .main-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .search-note {
    font-size: 18px;
  }

  .github-search-result {
    display: inline-block;
  }

  .github-search-home,
  .search-button {
    width: 100%;
    margin-right: 0;
  }
}
</style>
