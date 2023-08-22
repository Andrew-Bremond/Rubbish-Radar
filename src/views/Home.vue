<template>
<img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 100%; margin-top: -950px; object-fit: none; height: 400px; position: absolute;">

    <div id="container">
      <div id="map"></div>
    </div>

    <div>
      <body>
          <h1 style="text-align: center;"> Home </h1>
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
    methods: {
      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 12
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions); 
      }
    },
  }
</script>

<style scoped>
  #map {
    height: 60vh;
    width: 40vw;
    background-color: blue;
  }
  #container {
    margin-top: 50rem;
  }
</style>