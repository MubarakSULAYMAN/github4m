<template>
  <input
    type="text"
    :name="`search-${Math.random().toString(36).substring(2, 7)}`"
    :id="`search-${Math.random().toString(36).substring(2, 7)}`"
    class="github-search-base"
    autocomplete="off"
    :placeholder="placeholder"
    v-model="value"
    @keydown.enter="$emit('search', props.modelValue)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  placeholder: string;
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search GitHub',
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', searchTerm?: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped>
.github-search-base {
  /* width: 50%; */
  margin: 20px 0;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
}

.github-search-base:focus {
  border: 2px solid var(--gh4-blue);
}
</style>
