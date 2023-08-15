<script setup>
  import { ref } from "vue";
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to = "/"> Home </RouterLink>
        <RouterLink to = "/about"> About </RouterLink>
      </nav>
  </header>

  <RouterView/>
</template>

<style scoped>

nav {
  display: flex;
  position: absolute;
  font-size: 1rem;
  right: 10px;
  top: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 2rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
  }
}
</style>
