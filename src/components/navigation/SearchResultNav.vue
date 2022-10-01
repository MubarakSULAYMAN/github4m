<template>
  <div class="links-wrapper">
    <RouterLink to="" v-for="category in resultCategory" :key="category.name">
      <span class="title">{{ category.name }}</span>
      <span class="count">{{ category.count }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

type ResultCategory = {
  name: string;
  count: number;
};

const resultCategory = ref<ResultCategory[]>([
  { name: 'Repositories', count: 0 },
  { name: 'Code', count: 0 },
  { name: 'Commits', count: 0 },
  { name: 'Issues', count: 0 },
  { name: 'Discussions', count: 0 },
  { name: 'Packages', count: 0 },
  { name: 'Marketplace', count: 0 },
  { name: 'Topics', count: 0 },
  { name: 'Wikis', count: 0 },
  { name: 'Users', count: 0 },
]);
</script>

<style scoped>
.links-wrapper {
  border: 1px solid var(--color-border-hover);
  border-radius: 6px;
  overflow: hidden;
}

.links-wrapper a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}

.links-wrapper a:last-child {
  border-left: 2px solid var(--gh4-orange);
}

.links-wrapper a:not(:last-child) {
  border-bottom: 1px solid var(--color-border-hover);
  pointer-events: none;
}

.links-wrapper a:not(:last-child):hover {
  background-color: var(--gh4-gray-1);
}

.count {
  display: inline-block;
  padding: 0 4px;
  color: var(--vt-c-white);
  font-size: 12px;
  line-height: 1.4;
  border-radius: 4px;
  border-radius: 10px;
  background-color: var(--vt-c-text-light-2);
  /* background-color: var(--gh4-gray-3); */
  /* background-color: var(--gh4-gray-5); */
}
</style>
