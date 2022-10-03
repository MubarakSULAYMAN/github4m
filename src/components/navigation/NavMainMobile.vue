<template>
  <nav class="mobile-nav">
    <input
      type="text"
      name="user-search"
      id="useer-search"
      class="search-input"
      placeholder="Search"
      v-model="searchTerm"
      @keydown.enter="getUser(searchTerm)"
    />

    <RouterLink to="" v-for="menu in mobileNavMenu" :key="menu.name">{{ menu.name }}</RouterLink>
    <RouterLink to="" class="user-image">
      <img :src="userProfile?.avatarUrl" :alt="userProfile?.name" class="image-round-full" />
      <span>{{ username }}</span>
    </RouterLink>
    <RouterLink to="" class="signout">
      <IconSignOut />
      <span>Sign out</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { computed, reactive } from 'vue';
import type { NavMenu } from '@/types';
import IconSignOut from '@/components/icons/IconSignOut.vue';
import { useSharedStore } from '@/stores/shared';
import { useUserSearchStore } from '@/stores/user.search';

interface Props {
  username: string;
  imageUrl: string;
}

withDefaults(defineProps<Props>(), {
  username: 'Username',
  imageUrl: 'Profile Picture',
});

defineEmits<{
  (e: 'click'): void;
}>();

const store = useSharedStore();
const router = useRouter();
const route = useRoute();
const storeSearch = useUserSearchStore();
const searchTerm = store.searchTerm;
const userProfile = computed(() => store.currentUser?.user);

const mobileNavMenu = reactive<NavMenu[]>([
  {
    name: 'Dashboard',
    route: '',
  },
  {
    name: 'Issues',
    route: '',
  },
  {
    name: 'Codespaces',
    route: '',
  },
  {
    name: 'Marketplace',
    route: '',
  },
  {
    name: 'Explore',
    route: '',
  },
  {
    name: 'Sponsors',
    route: '',
  },
  {
    name: 'Settings',
    route: '',
  },
]);

function getUser(userLogin: string) {
  if (route.name === 'search-result') {
    storeSearch.fetchUser(userLogin);
    router.replace(`/search?q=${userLogin}&type=users`);
    // storeSearch.fetchUser(userLogin);
    // router.push(`/search?${userLogin}&type=users`);
  } else router.push(`/search?${userLogin}&type=users`);
}
</script>

<style scoped>
nav {
  display: none;
  flex-direction: column;
  padding: 16px;
}

.search-input {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 12px;
  padding: 6px 12px;
  color: var(--vt-c-white);
  font-size: 14px;
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 6px;
  background-color: var(--vt-c-black);
}

.search-input:focus {
  color: var(--vt-c-black);
  background-color: var(--vt-c-white);
  transition: color 0.5s, background-color 0.5s;
}

nav a {
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid var(--vt-c-text-dark-2);
}

nav a,
nav a span,
nav a svg {
  color: var(--vt-c-white);
  font-weight: 600;
}

.user-image img {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  /* border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  background-color: white; */
}

.user-image,
.signout {
  display: flex;
  align-items: center;
}

.user-image > :first-child,
.signout > :first-child {
  margin-right: 4px;
}

@media only screen and (max-width: 425px) {
  nav {
    display: flex;
  }
}

@media (prefers-color-scheme: dark) {
  .search-wrapper input:focus,
  .search-wrapper .recent-search {
    color: var(--vt-c-white);
    background-color: var(--vt-c-black);
  }
}
</style>
