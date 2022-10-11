<template>
  <div class="wrapper">
    <div class="loader-container" v-if="isLoading">
      <div class="loader"></div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>

<style scoped>
.wrapper {
  position: relative;
  min-height: 12rem;
}

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* min-height: 16rem; */
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1111;
}
.loader {
  border: 0.3rem solid var(--gh4-gray-2);
  border-top: 0.3rem solid var(--vt-c-black-dark);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
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
