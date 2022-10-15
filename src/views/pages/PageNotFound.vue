<template>
  <div class="flex-col">
    <div class="note">
      <p>
        At <RouterLink to="/">home</RouterLink> but far away from
        <RouterLink to="/">home</RouterLink>.
      </p>
      <p>Our routes will always guide you rightly, try that!</p>
    </div>
    <img src="@/assets/images/github-in-space.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
div:not(.note) {
  position: relative;
  width: 100%;
}

div.note {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
}

p,
p a {
  color: var(--vt-c-white);
}

p a:hover {
  text-decoration: underline;
  transition: all ease-in-out 0.5s;
}

img {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  div.note {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
}

@media only screen and (max-width: 425px) {
  div.note {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
  }

  div:not(.note) {
    justify-content: center;
    align-content: center;
    margin-bottom: 1rem;
  }
}
</style>
