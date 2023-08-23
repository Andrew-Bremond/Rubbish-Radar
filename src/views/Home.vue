<template>
  <img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 100%; top: 30px; object-fit: none; height: 400px; position: absolute;">

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
          zoom: 16
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions); 

        let infoWindow = new google.maps.InfoWindow();

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
            },
          );
          } else {
            handleLocationError(false, infoWindow, map.getCenter());
          }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
      );
      infoWindow.open(map);
    }
    window.initMap = initMap;
  }},

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
    height: 80vh;
    width: 80vw;
  }
  #container {
    top: 0;
    left: 0;
    right: 0;
  }
</style>