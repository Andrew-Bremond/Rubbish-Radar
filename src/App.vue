<script setup>
  import { ref } from "vue";
  import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import AddGoogleMap from './components/AddGoogleMap.vue';
  export default {
    name: 'App',
    components: {
      AddGoogleMap
    }
  }
</script>

<template>
  <div id="app">
    <AddGoogleMap />
  </div>
  <header>
      <nav>
        <RouterLink to = "/"> Home </RouterLink>
        <RouterLink to = "/about"> About </RouterLink>
      </nav>
  </header>

  <RouterView/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  position: absolute;
  font-size: 1rem;
  text-align: right;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex-center;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #bb6464;
  margin-top: 50px;
  }

}
</style>
