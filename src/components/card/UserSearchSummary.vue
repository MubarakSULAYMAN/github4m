<template>
  <ItemGroup>
    <div class="wrapper">
      <div class="repo-summary">
        <div class="title">
          <RouterLink to="" class="name">nft-gallery</RouterLink>
          <RouterLink to="" class="name user-name">nft-gallery</RouterLink>
        </div>

        <p class="description">NFT Explorer world_map compass running on Kusama and Polkadot</p>
        <p class="other-info">
          <span>Location</span>
          <a href="mailto:">email</a>
        </p>
      </div>

      <button>
        <span>Follow</span>
      </button>
    </div>
  </ItemGroup>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ItemGroup from '@/components/card/ItemGroup.vue';
</script>

<style scoped>
.wrapper,
.title {
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

.other-info {
  display: flex;
}

.other-info > :not(:first-child) {
  margin-left: 12px;
}

.other-info a:hover {
  color: var(--gh4-blue);
  text-decoration: none;
}

.title,
.title a.user-name,
.other-info,
.description,
.other-info a,
button span {
  color: var(--gh4-gray-3);
}

.title a {
  color: var(--gh4-blue);
  font-size: 20px;
  font-weight: 600;
}

.title a.user-name {
  margin-left: 12px;
  font-weight: normal;
}

.title a:hover {
  text-decoration: underline;
}

.other-info {
  font-size: 12px;
}

.description {
  margin-top: 8px;
}

button {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100px;
  height: 30px;
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
</style>
