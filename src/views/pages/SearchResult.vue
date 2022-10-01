<template>
  <div class="main-content">
    <input type="text" name="github-search" id="github-search" placeholder="Search GitHub" />

    <SearchResultNav />

    <section>
      <p class="count">11,923 users</p>
      <UserSearchSummary />
    </section>
  </div>
</template>

<script setup lang="ts">
import SearchResultNav from '@/components/navigation/SearchResultNav.vue';
import UserSearchSummary from '@/components/card/UserSearchSummary.vue';
</script>

<style scoped>
.main-content {
  display: grid;
  grid-template-columns: 2fr 5fr;
  width: 70%;
  margin: 20px auto;
  gap: 2rem;
}

.main-content .count {
  font-size: 20px;
  font-weight: 600;
}

#github-search {
  display: none;
  width: 100%;
  /* margin: 12px 0; */
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
}

#github-search:focus {
  border: 2px solid var(--gh4-blue);
}

@media only screen and (max-width: 768px) {
  .main-content {
    width: 90%;
  }
}

@media only screen and (max-width: 425px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  #github-search {
    display: inline-block;
  }
}
</style>
