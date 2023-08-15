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

<div id="app">
  <GmapMap
    :center="center"
    :zoom="18"
    map-style-id="roadmap"
    :options="mapOptions"
    style="width: 100vmin; height: 50vmin"
    ref="mapRef"
    @click="handleMapClick"
  >
    <GmapMarker
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      @drag="handleMarkerDrag"
      @click="panToMarker"
    />
  </GmapMap>
  <button @click="geolocate">Detect Location</button>
  <p>Selected Position: {{ marker.position }}</p>
</div>

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
