<template>
  <div>
    <NavMain />

    <RouterView />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import NavMain from '@/components/navigation/NavMain.vue';
import AppFooter from '@/components/AppFooter.vue';

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL;

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

const { result, loading, error } = useQuery(CHARACTERS_QUERY);
</script>

<style scoped>
/* header {
  line-height: 1.5;
} */
</style>
