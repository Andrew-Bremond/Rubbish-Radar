<template>
  <img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 100%; margin-top: -960px; object-fit: none; height: 400px; position: absolute;">

    <div id="container">
      <div id="map"></div>
    </div>

    <div>
      <body>
          <p> Know a trashcan you didn't see on this map? Help us by adding it. </p>
          <button @click="goToUserInputPage">Add Trashcan</button>
          <!-- <RouterLink></RouterLink> -->
      </body>
  </div>
</template>

<script>
  export default {
    methods: {
      goToUserInputPage() {
        this.$router.push("/UserInput");
      },

      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 12
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions); 
      }
    },

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
  }
</script>

<style scoped>
  #map {
    height: 60vh;
    width: 40vw;
    margin-left: 0;
    margin-right: 0;
  }
  #container {
    margin-top: -10rem;
  }
</style>