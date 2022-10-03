<template>
  <main>
    <NavTabs class="tabs-large-device" />

    <section class="main-content">
      <div>
        <UserProfileNav ref="scrollComponent" />
      </div>

      <div class="tabs-wrapper">
        <NavTabs class="tabs-small-device" />
      </div>

      <div class="main-page">
        <component :is="currentTab"></component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import NavTabs from '@/components/navigation/NavTabs.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UserProfileNav from '@/components/navigation/UserProfileNav.vue';
import OverviewTab from '@/components/Tab/OverviewTab.vue';
import RepositoriesTab from '@/components/Tab/RepositoriesTab.vue';
import ProjectsTab from '@/components/Tab/ProjectsTab.vue';
import PackagesTab from '@/components/Tab/PackagesTab.vue';
import StarsTab from '@/components/Tab/StarsTab.vue';

const route = useRoute();
const activeTab = computed(() => route.query.tab);

const currentTab = computed(() => {
  let tabName;

  switch (activeTab.value) {
    case 'repositories':
      tabName = RepositoriesTab;
      break;

    case 'projects':
      tabName = ProjectsTab;
      break;

    case 'packages':
      tabName = PackagesTab;
      break;

    case 'stars':
      tabName = StarsTab;
      break;

    default:
      tabName = OverviewTab;
      break;
  }

  return tabName;
});
</script>

<style scoped>
.main-content {
  display: grid;
  grid-template-columns: 2fr 5fr;
  column-gap: 2rem;
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
