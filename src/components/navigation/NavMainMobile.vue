<template>
  <nav>
    <input
      type="text"
      name="user-search"
      id="useer-search"
      class="search-input"
      placeholder="Search"
      v-model="searchTerm"
    />

    <RouterLink to="" v-for="menu in mobileNavMenu" :key="menu.name">{{ menu.name }}</RouterLink>
    <RouterLink to="" class="user-image">
      <img src="" alt="" class="image-round-full" />
      <span>{{ username }}</span>
    </RouterLink>
    <RouterLink to="" class="signout">
      <IconSignOut />
      <span>Sign out</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import type { NavMenu } from '@/types/index';
import IconSignOut from '@/components/icons/IconSignOut.vue';
import { useSharedStore } from '@/stores/shared';

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

const store = useSharedStore()
const searchTerm = store.searchTerm;

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
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.search-input {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 12px;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 6px;
  background-color: var(--vt-c-black);
}

.search-input:focus {
  background-color: var(--vt-c-white);
  transition: color 0.5s, background-color 0.5s;
}

nav a {
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid var(--vt-c-text-dark-2);
}

nav a,
nav a span {
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

@media (prefers-color-scheme: dark) {
  .search-wrapper input:focus,
  .search-wrapper .recent-search {
    color: var(--vt-c-white);
    background-color: var(--vt-c-black);
  }
}
</style>
