<template>
    <div id="container">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapTest',
    mounted() {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkgbhppn40r-DjzpnkAg0q7waZKQzsr8&callback=initMap';
        document.body.appendChild(script);
        script.onload = this.initMap;
      } else {
        this.initMap();
      }
    },
    methods: {
      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 12
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions); 
      }
    }
  }
  </script>
  
  <style scoped>
  #container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #map {
    height: 80vh;
    width: 80vw;
    background-color: blue;
  }
  </style>
  