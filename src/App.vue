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
  right: 0;
  top: 0;
  background-color: #31c48d;
  width: 100%;
  justify-content: right;
  padding-top: 10px;
  padding-bottom: 10px;
}

nav a.router-link-exact-active {
  color: black;
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  margin-right: 10px;
  color: black;
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
