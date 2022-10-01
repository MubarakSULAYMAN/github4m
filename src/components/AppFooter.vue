<template>
  <nav>
    <div class="copyright">
      <RouterLink to="" class="icon-github" title="GitHub">
        <IconGithub />
      </RouterLink>
      <span>{{ copyright }}</span>
    </div>

    <div class="footer-navigation">
      <RouterLink to="" class="foot-link" v-for="route in footerRoutes" :key="route.name">{{
        route.name
      }}</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { NavMenu } from '@/types/index';
import { ref } from 'vue';
import IconGithub from '@/components/icons/IconGithub.vue';

const copyright = `© ${new Date().getFullYear()} GitHub, Inc.`;
const footerRoutes = ref<NavMenu[]>([
  { name: 'Terms', route: '' },
  { name: 'Privacy', route: '' },
  { name: 'Security', route: '' },
  { name: 'Status', route: '' },
  { name: 'Docs', route: '' },
  { name: 'Contact GitHub', route: '' },
  { name: 'Pricing', route: '' },
  { name: 'API', route: '' },
  { name: 'Training', route: '' },
  { name: 'Blog', route: '' },
  { name: 'About', route: '' },
]);
</script>

<style scoped>
nav {
  display: grid;
  /* grid-template-columns: 250px 1fr; */
  grid-template-columns: fit-content(250px) 1fr;
  /* minmax(100px, 500px) */
  padding: 40px 0;
  border-top: 1px solid var(--color-border-hover);
}

.copyright {
  padding-left: 60px;
}

.copyright span {
  margin-left: 4px;
  color: var(--gh4-gray-3);
  vertical-align: super;
}

.icon-github svg {
  width: 25px;
  height: 25px;
  margin-right: 4px;
  opacity: 0.8;
}

.icon-github svg:hover {
  opacity: 1;
}

.icon-github span {
  vertical-align: text-bottom;
  vertical-align: middle;
}

.footer-navigation a {
  margin-left: 30px;
  color: var(--gh4-blue);
}

.copyright span,
.footer-navigation a {
  font-size: 12px;
}

.footer-navigation a:hover,
.footer-navigation a:hover {
  text-decoration: underline;
}

@media only screen and (min-width: 1200px) {
  .copyright {
    padding-right: 40px;
  }

  .footer-navigation a {
    margin-left: 40px;
  }
}

@media only screen and (max-width: 1010px) {
  nav {
    display: grid;
    grid-template-columns: 1fr;
    /* justify-content: space-evenly; */
    justify-items: center;
    /* align-content: space-evenly; */
    align-items: center;
  }

  nav a span,
  a span {
    /* vertical-align: middle; */
    background-color: red !important;
  }

  .copyright {
    grid-row: 2 / 3;
  }

  .footer-navigation {
    grid-row: 1 / 2;
  }

  .footer-navigation {
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 767px) {
}
</style>
