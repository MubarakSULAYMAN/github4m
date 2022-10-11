<template>
  <div>
    <NavMain />

    <RouterView />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMain from '@/components/navigation/NavMain.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped></style>
