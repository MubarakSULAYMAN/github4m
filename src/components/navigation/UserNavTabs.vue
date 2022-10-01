<template>
  <nav>
    <span class="empty-space">
      <div class="user-details" v-if="showItem">
        <img src="" alt="" class="image-round-full" />
        <div class="username">MubarakSULAYMAN</div>
      </div>
    </span>

    <div class="tabs">
      <RouterLink
        :to="tab.name"
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ 'route-active': routeQuery.tab === tab.name.toLowerCase() }"
      >
        <span class="item-group">
          <component :is="tab.icon"></component>
          <span class="route-name">{{ tab.name }}</span>
          <span class="repo-count" v-if="tab.name === 'Repositories' && repoCount > 0">
            {{ repoCount }}
          </span>
          <span class="star-count" v-if="tab.name === 'Stars' && starCount > 0">
            {{ starCount }}
          </span>
        </span>
      </RouterLink>
      <!-- <div>{{ route }}</div> -->
      <!-- <div>username:{{ !!routeParams.username }}</div> -->
      <!-- <div>query:{{ routeQuery.tab }}</div> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, reactive, onBeforeUnmount } from 'vue';
import type { NavMenu } from '@/types/index';
import IconBookOpen from '@/components/icons/IconBookOpen.vue';
import IconBookClose from '@/components/icons/IconBookClose.vue';
import IconTable from '@/components/icons/IconTable.vue';
import IconBox from '@/components/icons/IconBox.vue';
import IconStar from '@/components/icons/IconStar.vue';

type Tabs = NavMenu & {
  icon: string;
};

const route = useRoute();
const routeQuery = reactive(route.query);
const currentUser = ref<string>('');
const repoCount = ref<number>(10);
const starCount = ref<number>(20);
const tabs = reactive<Tabs[]>([
  {
    name: 'Overview',
    route: `/${currentUser.value}`,
    icon: IconBookOpen,
  },
  {
    name: 'Repositories',
    route: `/${currentUser.value}?tab=repositories`,
    icon: IconBookClose,
  },
  {
    name: 'Projects',
    route: `/${currentUser.value}?tab=projects`,
    icon: IconTable,
  },
  {
    name: 'Packages',
    route: `/${currentUser.value}?tab=packages`,
    icon: IconBox,
  },
  {
    name: 'Stars',
    route: `/${currentUser.value}?tab=stars`,
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
  /* display: none; */
  padding-top: 20px;
  border-bottom: 1px solid var(--color-border-hover);
  background-color: var(--color-background);
  z-index: 1;
  /* border: 1px solid var(--vt-c-divider-dark-1); */
  /* overflow-x: auto; */
}

.empty-space {
  display: inline-block;
  /* width: 300px; */
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
  /* padding: 0 8px; */
}

a {
  padding: 8px 0;
  /* font-size: 12px; */
  /* line-height: 1.5; */
  /* border: 1px solid green; */
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
  /* border: 1px solid blue; */
  border-radius: 4px;
  /* color: var(--vt-c-text-dark-2); */
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
}

@media only screen and (max-width: 767px) {
  nav {
    padding-top: 0;
  }
}
</style>
