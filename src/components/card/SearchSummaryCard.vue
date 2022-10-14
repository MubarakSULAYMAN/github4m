<template>
  <ItemGroup>
    <div class="card-wrapper">
      <img
        :src="userInfo?.avatarUrl || 'https://source.unsplash.com/user/c_v_r'"
        :alt="userInfo?.name || userInfo?.login"
        class="card-avatar rounded-full"
      />

      <div class="card-content">
        <div class="card-summary">
          <div class="card-title">
            <RouterLink
              :to="`/${userInfo?.login}/?tab=repositories`"
              v-if="userInfo?.name"
              class="name"
            >
              {{ userInfo?.name }}
            </RouterLink>

            <RouterLink
              :to="`/${userInfo?.login}/?tab=repositories`"
              v-if="userInfo?.login"
              class="name user-name"
            >
              {{ userInfo?.login }}
            </RouterLink>
          </div>

          <p class="description" v-text="userInfo?.bio" />
          <p class="other-info">
            <span v-text="userInfo?.location" v-if="userInfo?.location" />
            <a
              :href="`mailto:${userInfo?.email}`"
              v-text="userInfo?.email"
              v-if="userInfo?.email"
            />
          </p>
        </div>

        <button>Follow</button>
      </div>
    </div>
  </ItemGroup>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ItemGroup from '@/components/card/ItemGroup.vue';
import type { UserInfo } from '@/types';

interface Props {
  userInfo: UserInfo;
}

withDefaults(defineProps<Props>(), {
  userInfo: undefined,
});
</script>

<style scoped>
.card-wrapper,
.card-content {
  display: flex;
}

.card-avatar {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

.card-content {
  width: 100%;
  justify-content: space-between;
}

.card-title {
  align-items: center;
}

.other-info {
  display: flex;
}

.other-info > :not(:last-child),
.card-title a.name:first-child {
  margin-right: 12px;
}

.other-info a:hover {
  color: var(--gh4-blue);
  text-decoration: none;
}

.card-title,
.card-title a.user-name,
.other-info,
.description,
.other-info a,
button {
  color: var(--gh4-gray-3);
}

.card-title a {
  color: var(--gh4-blue);
  font-size: 16px;
  font-weight: 600;
}

.card-title a.user-name {
  font-weight: normal;
}

.card-title a:hover {
  text-decoration: underline;
}

button,
.other-info * {
  font-size: 12px;
}

.description {
  font-size: 14px;
}

button {
  height: 30px;
  color: var(--color-text);
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background-color: var(--gh4-gray-4);
}

button:hover {
  background-color: var(--gh4-gray-1);
}
</style>
