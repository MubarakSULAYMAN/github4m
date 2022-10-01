<template>
  <header>
    <nav>
      <IconHamburgerMenu class="hamburger-menu" @click="toggleMobileNav" />
      <div class="nav-left">
        <RouterLink to="" class="icon-github">
          <IconGithub />
        </RouterLink>

        <div :class="['search-wrapper', { 'wrapper-active': onFocus }]">
          <input
            type="text"
            name="user-search"
            id="user-search"
            placeholder="Search or jump to..."
            v-model="searchTerm"
            @focus="onFocus = true"
            @blur="onFocus = false"
          />
          <div class="recent-search" v-show="onFocus">
            <div>Recent search and suggestions</div>
            <div>Curently unavailable</div>
          </div>
        </div>

        <RouterLink to="" v-for="menu in topNavMenu" :key="menu.name">{{ menu.name }}</RouterLink>
      </div>

      <div class="nav-right">
        <IconBell class="icon-bell" />
        <span class="icon-plus">
          <IconPlus />
          <IconCaretDown />
        </span>

        <span class="user-image">
          <img src="" alt="" class="image-round-full" />
          <IconCaretDown />
        </span>
      </div>
    </nav>

    <NavMainMobile v-if="showMobileNav" />
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconHamburgerMenu from '@/components/icons/IconHamburgerMenu.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import type { NavMenu } from '@/types/index';
import NavMainMobile from '@/components/navigation/NavMainMobile.vue';
import { useSharedStore } from '@/stores/shared';

const store = useSharedStore();
const searchTerm = store.searchTerm;
const onFocus = ref<boolean>(false);

const topNavMenu = reactive<NavMenu[]>([
  {
    name: 'Pull requests',
    route: '',
  },
  {
    name: 'Issues',
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
]);

const showMobileNav = ref<boolean>(false);

const toggleMobileNav = () => (showMobileNav.value = !showMobileNav.value);
</script>

<style scoped>
header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  color: var(--vt-c-white);
  background-color: var(--vt-c-black);
}

.hamburger-menu {
  display: none;
}

.icon-github {
  display: flex;
  align-items: center;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.nav-right :deep([class^='icon-']) {
  margin: 0 16px;
}

.nav-right .icon-plus,
.nav-right .user-image {
  display: flex;
  align-items: baseline;
}

nav svg,
nav a {
  color: var(--vt-c-white);
}

nav a {
  font-weight: 600;
  margin-left: 16px;
}

nav a:hover,
nav svg:hover,
nav .icon-plus:hover {
  color: var(--vt-c-text-dark-2);
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

.search-wrapper {
  width: 260px;
  display: relative;
  margin-left: 16px;
  transition: width 0.5s, background-color 0.5s;
}

.search-wrapper.wrapper-active {
  width: 520px;
}

.search-wrapper input {
  width: 100%;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 6px;
  background-color: var(--vt-c-black);
}

.search-wrapper input:focus {
  border-radius: 6px 6px 0 0;
  background-color: var(--vt-c-white);
}

.search-wrapper .recent-search {
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  color: var(--vt-c-black);
  border: 1px solid var(--vt-c-text-dark-2);
  border-top-color: transparent;
  border-radius: 0 0 6px 6px;
  background-color: var(--vt-c-white);
  z-index: 999;
}

.search-wrapper.wrapper-active .recent-search {
  width: 100%;
  height: fit-content;
  height: max-content;
}

.recent-search div {
  padding: 6px 12px;
  font-weight: 600;
}

.recent-search div:not(:last-child) {
  border-bottom: 1px solid var(--vt-c-text-dark-2);
}

@media only screen and (max-width: 900px) {
  .search-wrapper {
    width: 200px;
  }

  .search-wrapper.wrapper-active {
    width: 300px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 800px) {
  nav {
    padding: 6px 12px;
  }

  .search-wrapper.wrapper-active {
    width: 220px;
  }

  nav a {
    margin-left: 12px;
  }

  .nav-right :deep([class^='icon-']) {
    margin: 0 12px;
  }
}

@media only screen and (max-width: 767px) {
  .nav-left > :not(:first-child),
  .nav-right > :not(:first-child) {
    display: none;
  }

  .hamburger-menu {
    display: inline-block;
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
