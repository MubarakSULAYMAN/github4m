<template>
  <ItemGroup>
    <div class="wrapper">
      <div class="repo-summary">
        <div class="title">
          <RouterLink to="" class="name">nft-gallery</RouterLink>
          <span class="category">Public</span>
        </div>

        <p class="repo-origin">Forked from kodadot/nft-gallery</p>
        <p class="description">NFT Explorer world_map compass running on Kusama and Polkadot</p>
      </div>

      <button>
        <IconStar />
        <span>Star</span>
      </button>
    </div>

    <div class="repo-topics">
      <span class="topic" :title="`Topic: `" v-for="x in 12" :key="x">Topic</span>
    </div>

    <div class="repo-tips">
      <div class="language-info">
        <span class="dot"></span>
        <span class="language">HTML</span>
      </div>
      <RouterLink to="" class="fork-info">
        <IconBranch />
        <span to="" class="fork-count">84</span>
      </RouterLink>
      <div class="license-info">
        <IconScale />
        <span class="license-name">MIT License</span>
      </div>
      <div class="relative-date">Updated on 25 Jul 2021</div>
    </div>
  </ItemGroup>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import ItemGroup from '@/components/card/ItemGroup.vue';
import IconStar from '@/components/icons/IconStar.vue';
import IconBranch from '@/components/icons/IconBranch.vue';
import IconScale from '@/components/icons/IconScale.vue';
</script>

<style scoped>
.wrapper,
.title,
.repo-topics,
.repo-tips,
.repo-tips [class$='-info'] {
  display: flex;
}

/* .repo-summary {} */

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

.title,
.repo-origin,
.description,
button span {
  color: var(--gh4-gray-3);
}

.title a {
  color: var(--gh4-blue);
  font-size: 20px;
  font-weight: 600;
}

.title a:hover {
  text-decoration: underline;
}

.title .category {
  /* display: inline-block; */
  margin-left: 12px;
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

.repo-topics {
  flex-wrap: wrap;
  margin: 8px 0;
}

.repo-topics .topic {
  padding: 1px 8px;
  color: var(--gh4-blue);
  /* font-size: 12px; */
  border-radius: 10px;
  background-color: var(--gh4-blue-light);
}

/* .repo-topics .topic:not(:first-child) { */
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
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100px;
  height: 30px;
  /* margin: 12px 0; */
  /* padding: 8px; */
  padding: 0 12px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background-color: var(--gh4-gray-4);
}

button span {
  margin-left: 12px;
}

button:hover {
  background-color: var(--gh4-gray-1);
}

.repo-tips {
  /* margin-top: 8px; */
  color: var(--gh4-gray-3);
  font-size: 12px;
}
.repo-tips [class$='-info']:not(:first-child),
.repo-tips .relative-date {
  margin-left: 12px;
}
/* .language-info */
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

.fork-info:hover svg,
.fork-info:hover span {
  color: var(--gh4-blue);
}

/* .license-info */
/* .relative-date */

.language,
.fork-count,
.license-name {
  margin-left: 4px;
}
</style>
