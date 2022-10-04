<template>
  <section class="search-home" v-if="!username">
    <div class="search-note">
      <IconHandLense />
      <p>Search more than <b>99M</b> users</p>
    </div>

    <div class="search-area">
      <input
        type="text"
        name="github-home-search"
        id="github-home-search"
        placeholder="Search GitHub"
        v-model="searchTerm"
        @keydown.enter="getUser(searchTerm)"
      />
      <button class="search-button" @click="getUser(searchTerm)">Search</button>
    </div>

    <p class="protip"><b>ProTip!</b> For an advanced search, use some of our prefixes</p>
  </section>

  <div class="main-content" v-else>
    <input
      type="text"
      name="github-search"
      id="github-search"
      placeholder="Search GitHub"
      v-model="searchTerm"
      @keydown.enter="getUser(searchTerm)"
    />

    <SearchResultNav :users-count="usersCount" />

    <section>
      <p class="count">
        {{ usersCount?.toLocaleString('en') || 0 }} <span v-if="usersCount! > 1">users</span>
        <span v-else>user</span>
      </p>

      <p class="no-user" v-if="!usersCount">No user found</p>

      <UserSearchSummary v-for="user in users" :key="user?.node.login" :user-info="user?.node" />
    </section>
  </div>
</template>

<script setup lang="ts">
import SearchResultNav from '@/components/navigation/SearchResultNav.vue';
import UserSearchSummary from '@/components/card/UserSearchSummary.vue';
import { useSharedStore } from '@/stores/shared';
import { useUserSearchStore } from '@/stores/user.search';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconHandLense from '@/components/icons/IconHandLense.vue';

const store = useSharedStore();
const route = useRoute();
const router = useRouter();
const storeSearch = useUserSearchStore();
const searchTerm = store.searchTerm;
const username = computed(() => route.query.q);

const usersCount = computed(() => storeSearch.users?.search.userCount);
const users = computed(() =>
  storeSearch.users?.search.edges?.filter((user) => user?.node.__typename === 'User')
);

function getUser(userLogin: string) {
  storeSearch.fetchUser(userLogin);

  router.replace({
    name: 'search-result',
    query: {
      q: store.searchTerm,
      type: 'users',
    },
  });
}

if (username.value) {
  getUser(String(username.value));
}
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

#github-home-search,
#github-search {
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
}

#github-home-search {
  width: calc(90% - 12px);
  padding: 7px 12px;
  font-size: 16px;
  margin-right: 12px;
}

#github-home-search:focus,
#github-search:focus {
  border: 2px solid var(--gh4-blue);
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

#github-search {
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

  #github-search {
    display: inline-block;
  }

  #github-home-search,
  .search-button {
    width: 100%;
    margin-right: 0;
  }
}
</style>
