<template>
  <footer>
    <div class="left-foot flex-row">
      <span>© {{ new Date().getFullYear() }} GitHub, Inc.</span>
      <span>Terms</span>
      <span>Privacy</span>
      <span>Security</span>
      <span>Status</span>
      <span>Docs</span>
    </div>

    <span class="logo" @click="goTo('/')">
      <i aria-hidden="true" class="fab fa-github" title="github"></i>
    </span>

    <div class="right-foot flex-row">
      <span>Contact GitHub</span>
      <span>Pricing</span>
      <span>API</span>
      <span>Training</span>
      <span>Blog</span>
      <span>About</span>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
footer {
  width: calc(100vw - 40px);
  font-size: var(--font-sm);
}

footer .left-foot,
footer .right-foot {
  width: 70vw;
  margin: 0 40px;
  justify-content: space-between;
}

footer span:not(.left-foot span:first-child) {
  color: var(--github-blue);
}

footer span:not(.left-foot span:first-child):hover,
footer span:not(.left-foot span:first-child):focus {
  text-decoration: underline;
  cursor: pointer;
}

span.logo .fa-github {
  color: var(--github-gray);
  font-size: 24px;
  opacity: 0.2;
}

span.logo .fa-github:hover {
  opacity: 0.6;
}
@media only screen and (max-width: 768px) {
  footer {
    width: 100vw;
    margin: 0;
    padding: 2rem 0 1rem;
    flex-wrap: wrap;
  }

  footer .left-foot,
  footer .right-foot {
    justify-content: center;
    width: 100vw;
    margin: 1rem 20px 0;
  }

  footer .left-foot span:not(:first-child),
  footer .right-foot span:not(:first-child) {
    margin-left: 1.5rem;
  }

  span.logo {
    display: none;
  }
}

@media only screen and (max-width: 425px) {
  footer {
    grid-column: 1 / 2;
    grid-row: 4 / 5;
    margin: 0;
  }

  footer .left-foot,
  footer .right-foot {
    flex-wrap: wrap;
    margin: 1rem 5px 0;
  }
}
</style>
