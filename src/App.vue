<template>
  <div>
    <NavMain />

    <RouterView />

    <AppFooter />

    <div class="loader-container" v-if="isLoading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMain from '@/components/navigation/NavMain.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useSharedStore } from '@/stores/shared';
import { computed } from 'vue';

const store = useSharedStore();
const isLoading = computed(() => store.isLoading);
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1111;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
