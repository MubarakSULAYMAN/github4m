<template>
  <main>
    <UserNavTabs class="tabs-large-device" />

    <section class="main-content">
      <div>
        <UserSideNav ref="scrollComponent" />
      </div>

      <div class="tabs-wrapper">
        <UserNavTabs class="tabs-small-device" />
      </div>

      <!-- <div>Main {{ route }} {{ routeQuery }} {{ routeParams }}</div> -->
      <div class="main-page">
        <input
          type="text"
          name="repository-search"
          id="repository-search"
          placeholder="Find a repository..."
        />

        <RepoSummary v-for="(item, index) in 16" :key="index" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import UserNavTabs from '@/components/navigation/UserNavTabs.vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserSideNav from '@/components/navigation/UserSideNav.vue';
import RepoSummary from '@/components/card/RepoSummary.vue';

const route = useRoute();
const router = useRouter();
const routeParams = reactive(route.params);
const routeQuery = reactive(route.query);

if (!routeQuery.tab) {
  router.replace({ path: String(routeParams.username), query: { tab: 'repositories' } });
}
</script>

<style scoped>
.main-content {
  display: grid;
  grid-template-columns: 2fr 5fr;
  /* grid-template-columns: minmax(2fr, 27%) 5fr; */
  /* grid-template-columns: 27% 73%; */
  column-gap: 2rem;
  /* justify-items: stretch;
  align-items: stretch; */
  /* grid-auto-flow: dense; */
}

.tabs-large-device {
  display: flex;
}
.tabs-wrapper,
.tabs-small-device {
  display: none;
}

.main-page {
  width: 92%;
  margin-right: auto;
  /* border: 1px solid red; */
}

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
  /* color: var(--gh4-blue); */
}

@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .main-content {
    grid-template-columns: 30% 70%;
  }
}

@media only screen and (max-width: 767px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .tabs-large-device {
    display: none;
  }

  .tabs-wrapper {
    overflow-x: auto;
  }

  .tabs-wrapper,
  .tabs-small-device {
    display: flex;
    padding-top: 0;
  }

  .main-page {
    width: 100%;
    padding: 20px;
  }
}
</style>
