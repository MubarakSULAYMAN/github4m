<template>
  <ItemGroup>
    <div class="wrapper">
      <div class="repo-summary">
        <div class="title">
          <a
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="name"
            v-text="repo.name"
          />
          <span class="category" v-if="!repo.isPrivate">Public</span>
        </div>

        <p class="repo-origin" v-if="repo.parent">
          Forked from
          <a
            :href="repo.parent.url"
            target="_blank"
            rel="noopener noreferrer"
            v-text="repo.parent.name"
          />
        </p>
        <p class="description" v-html="repo.descriptionHTML" />
      </div>

      <button>
        <IconStar />
        <span>{{ repo.stargazerCount }}</span>
      </button>
    </div>

    <div class="repo-topics" v-if="topics">
      <a
        :href="topic.url"
        target="_blank"
        rel="noopener noreferrer"
        class="topic"
        :title="`Topic: ${topic.topic.name}`"
        v-for="topic in topics"
        :key="topic.topic.name"
        v-text="topic.topic.name"
      />
    </div>

    <div class="repo-tips">
      <div class="language-info" v-if="repo.primaryLanguage">
        <span class="dot" :style="{ backgroundColor: repo.primaryLanguage.color }" />
        <span class="language" v-text="repo.primaryLanguage.name" />
      </div>

      <RouterLink to="" class="fork-info" v-if="repo.forkCount">
        <IconBranch />
        <span to="" class="fork-count" v-text="repo.forkCount" />
      </RouterLink>

      <div class="license-info" v-if="repo.licenseInfo">
        <IconScale />
        <span class="license-name" v-text="repo.licenseInfo.name" />
      </div>

      <div class="relative-date">
        Updated on
        <span :title="`${dayjs(repo.updatedAt).format('D MMM YYYY, HH:MM')} ${currentTimezone}`">
          {{ customDate(repo.updatedAt) }}
        </span>
      </div>
    </div>
  </ItemGroup>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ItemGroup from '@/components/card/ItemGroup.vue';
import IconStar from '@/components/icons/IconStar.vue';
import IconBranch from '@/components/icons/IconBranch.vue';
import IconScale from '@/components/icons/IconScale.vue';
import type { Repository } from '@/types';
import { computed } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
// dayjs.extend(utc);
// dayjs.extend(timezone);
// import type { CSSProperties } from 'vue';

interface Props {
  repositoryInfo: Repository;
}

const props = withDefaults(defineProps<Props>(), {
  repositoryInfo: undefined,
});

const repo = computed(() => props.repositoryInfo.node);
const topics = computed(() => repo.value.repositoryTopics.nodes);
// const dotStyle = computed(
//   () => ({ backgroundColor: repo.value.primaryLanguage.color } as unknown as CSSProperties)
// );

function customDate(date: string) {
  if (!date) {
    return null;
  }
  if (dayjs(date).fromNow().includes('year')) {
    return `on ${dayjs(date).format('D MMM YYYY')}`;
  }
  const fromNowMonth = dayjs(date).fromNow().includes('month');
  const currentYear = new Date().getFullYear();
  const isThisYear = parseInt(String(date).slice(0, 4), 10) === currentYear;
  if (fromNowMonth && isThisYear) {
    return `on ${dayjs(date).format('D MMM')}`;
  }
  return dayjs(date).fromNow();
}

const userLocale =
  navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;

const currentTimezone = computed(() =>
  new Date()
    .toLocaleDateString(userLocale, {
      day: '2-digit',
      // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: 'short',
    })
    .slice(4)
);
</script>

<style scoped>
.wrapper,
.title,
.repo-topics,
.repo-tips,
.repo-tips [class$='-info'] {
  display: flex;
}

.title,
.repo-tips,
.repo-tips [class$='-info']:not(:first-child) {
  align-items: center;
}

.repo-tips [class$='-info']:first-child {
  align-items: baseline;
}

.wrapper {
  justify-content: space-between;
}

.repo-summary {
  width: calc(100% - 100px);
}

.title,
.repo-origin,
.repo-origin a,
.description :deep(a),
.description,
button span {
  color: var(--gh4-gray-3);
}

.title {
  flex-wrap: wrap;
  word-break: break-all;
}

.title a {
  margin-right: 12px;
  color: var(--gh4-blue);
  font-size: 20px;
  font-weight: 600;
}

.title a:hover {
  text-decoration: underline;
}

.title .category {
  padding: 0 8px;
  border: 1px solid var(--color-border-hover);
  border-radius: 10px;
}

.title .category,
.repo-origin,
.repo-topics .topic {
  font-size: 12px;
}

.description {
  margin-top: 8px;
}

.repo-topics,
.repo-tips {
  flex-wrap: wrap;
}

.repo-topics {
  margin: 8px 0;
}

.repo-topics .topic {
  padding: 1px 8px;
  color: var(--gh4-blue);
  border-radius: 10px;
  background-color: var(--gh4-blue-light);
}

.repo-topics .topic {
  margin-left: 2px;
  margin-bottom: 2px;
}

.repo-topics .topic:hover {
  color: var(--vt-c-white);
  background-color: var(--gh4-blue);
  cursor: pointer;
}

button {
  width: 80px;
  height: 26px;
  padding: 0 12px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background-color: var(--gh4-gray-4);
}

button svg {
  vertical-align: middle;
}

button span {
  margin-left: 12px;
  vertical-align: middle;
}

button:hover {
  background-color: var(--gh4-gray-1);
}

.repo-tips {
  color: var(--gh4-gray-3);
  font-size: 12px;
}

.repo-tips [class$='-info']:not(:first-child),
.repo-tips .relative-date {
  margin-left: 12px;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
}

.fork-info span {
  color: var(--color-text);
}

.repo-origin a:hover,
.description :deep(a):hover,
.fork-info:hover svg,
.fork-info:hover span {
  color: var(--gh4-blue);
}

.language,
.fork-count,
.license-name {
  margin-left: 4px;
}

@media only screen and (max-width: 767px) {
  button {
    margin: auto;
  }
}
</style>
