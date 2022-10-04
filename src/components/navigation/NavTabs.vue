<template>
  <nav>
    <span class="empty-space">
      <div class="user-details" v-if="showItem">
        <img :src="userProfile?.avatarUrl" :alt="userProfile?.name" class="image-round-full" />
        <div class="username" v-texxt="userProfile?.login" />
      </div>
    </span>

    <div class="tabs">
      <RouterLink
        :to="tab.route"
        v-for="tab in navTabs"
        :key="tab.name"
        :class="{
          'route-active':
            activeTab === tab.name.toLowerCase() ||
            (!navTabs.some((tab) => tab.name.toLocaleLowerCase() === activeTab) &&
              tab.name === 'Overview'),
        }"
      >
        <span class="item-group">
          <component :is="tab.icon" />
          <span class="route-name">{{ tab.name }}</span>
          <span class="repo-count" v-if="tab.name === 'Repositories' && repoCount > 0">
            {{ repoCount }}
          </span>
          <span class="star-count" v-if="tab.name === 'Stars' && starCount > 0">
            {{ starCount }}
          </span>
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, reactive, onBeforeUnmount, computed } from 'vue';
import type { NavMenu } from '@/types';
import IconBookOpen from '@/components/icons/IconBookOpen.vue';
import IconBookClose from '@/components/icons/IconBookClose.vue';
import IconTable from '@/components/icons/IconTable.vue';
import IconBox from '@/components/icons/IconBox.vue';
import IconStar from '@/components/icons/IconStar.vue';
import { useSharedStore } from '@/stores/shared';

type NavTabs = NavMenu & {
  icon: string;
};

const route = useRoute();
const store = useSharedStore();
const username = computed(() => route.params.username);
const userProfile = computed(() => store.currentUser?.user);
const activeTab = computed(() => route.query.tab);
const repoCount = computed(() => userProfile.value?.repositories?.totalCount || 0);
const starCount = computed(() => userProfile.value?.starredRepositories?.totalCount || 0);

const navTabs = reactive<NavTabs[]>([
  {
    name: 'Overview',
    route: `/${username.value || 'MubarakSULAYMAN'}`,
    icon: IconBookOpen,
  },
  {
    name: 'Repositories',
    route: `/${username.value || 'MubarakSULAYMAN'}?tab=repositories`,
    icon: IconBookClose,
  },
  {
    name: 'Projects',
    route: `/${username.value || 'MubarakSULAYMAN'}?tab=projects`,
    icon: IconTable,
  },
  {
    name: 'Packages',
    route: `/${username.value || 'MubarakSULAYMAN'}?tab=packages`,
    icon: IconBox,
  },
  {
    name: 'Stars',
    route: `/${username.value || 'MubarakSULAYMAN'}?tab=stars`,
    icon: IconStar,
  },
]);

const showItem = ref<boolean>(true);

function onScroll(e: any) {
  if (typeof window === 'undefined') return;
  // if (element.getBoundingClientRect().bottom < window.innerHeight) {
  const top = window.pageYOffset || e.target.scrollTop || 0;
  showItem.value = top > 370;
}

showItem.value = false;
window.addEventListener('scroll', onScroll);

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
nav {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  padding-top: 20px;
  border-bottom: 1px solid var(--color-border-hover);
  background-color: var(--color-background);
  z-index: 1;
}

.empty-space {
  display: inline-block;
  width: calc((2 / 7) * 100%);
}

.user-details {
  display: flex;
  align-items: center;
  width: 80%;
  margin-left: auto;
}

.user-details img {
  width: 35px;
  height: 35px;
}

.user-details .username {
  margin-left: 4px;
  font-weight: 600;
}

.tabs {
  display: flex;
}

a {
  padding: 8px 0;
}

nav a:first-child {
  margin-left: 24px;
}

a:not(:first-child) {
  margin-left: 12px;
}

a .item-group {
  display: flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--color-text);
}

a:hover .item-group {
  background-color: var(--gh4-gray-1);
}

a .item-group > :first-child {
  margin-right: 4px;
  color: var(--gh4-gray-3);
}

a .item-group [class$='-count'] {
  margin-left: 8px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 1.4;
  border-radius: 4px;
  border-radius: 10px;
  background-color: var(--gh4-gray-2);
}

.route-active {
  border-bottom: 2px solid var(--gh4-orange);
}

.route-active .route-name {
  font-weight: 600;
  color: var(--vt-c-black);
}

@media only screen and (max-width: 767px) {
  nav {
    padding-top: 0;
  }
}

@media (prefers-color-scheme: dark) {
  a .item-group [class$='-count'] {
    color: var(--vt-c-black);
  }
}
</style>
