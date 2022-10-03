<template>
  <div class="links-wrapper">
    <RouterLink to="" v-for="category in resultCategory" :key="category.name">
      <span class="title">{{ category.name }}</span>
      <span :class="['count', { 'count-zero': !category.count }]">{{
        category.count?.toLocaleString('en')
      }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

interface Props {
  usersCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  usersCount: 0,
});

const resultCategory = computed(() => [
  { name: 'Repositories', count: 0 },
  { name: 'Code', count: 0 },
  { name: 'Commits', count: 0 },
  { name: 'Issues', count: 0 },
  { name: 'Discussions', count: 0 },
  { name: 'Packages', count: 0 },
  { name: 'Marketplace', count: 0 },
  { name: 'Topics', count: 0 },
  { name: 'Wikis', count: 0 },
  { name: 'Users', count: props.usersCount },
]);
</script>

<style scoped>
.links-wrapper {
  height: fit-content;
  border: 1px solid var(--color-border-hover);
  border-radius: 6px;
  overflow: hidden;
}

.links-wrapper a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text);
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
  padding: 1px 6px;
  color: var(--vt-c-white);
  font-size: 13px;
  line-height: 1.4;
  border-radius: 5px;
  border-radius: 10px;
  background-color: var(--vt-c-text-light-2);
}

.count-zero {
  color: var(--vt-c-black);
  background-color: var(--vt-c-text-dark-2);
}
</style>
