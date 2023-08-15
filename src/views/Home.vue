<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import * as VueGoogleMaps from "vue2-google-maps";
</script>

<template>
  <header>
    <h1> Home </h1>
    <p> Theoretically, elements should be consistent routing to different pages. </p>
  </header>
</template>

<script>
  Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyBXgokapngeS3mM4RaZfYr8fCIvKshSdzk",
        libraries: "places"
    }
  });
</script>

<style scoped>
</style>