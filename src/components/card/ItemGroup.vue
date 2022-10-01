<template>
  <div class="container">
    <h6 class="card-title" v-if="!!title">{{ title }}</h6>
    <div class="item-group">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<style scoped>
.container {
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid var(--color-border-hover);
  line-break: auto;
  /* word-break: break-all; */
}

.card-title {
  font-size: 16px;
  font-weight: 600;
}
</style>
