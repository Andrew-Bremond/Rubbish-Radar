<template>
  <img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 100%; top: 30px; object-fit: none; height: 400px; position: absolute;">

    <div id="map"> </div>
      <body>
          <p> Know a trashcan you didn't see on this map? Help us by adding it. </p>
          <button @click="goToUserInputPage">Add Trashcan</button>
          <!-- <RouterLink></RouterLink> -->
      </body>
</template>

<script>
  export default {
    name: 'MapTest',
    mounted() {
      if (!window.google) 
      {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkgbhppn40r-DjzpnkAg0q7waZKQzsr8&callback=initMap&map_ids=4af310b3e8d84ead';
        document.body.appendChild(script);
        script.onload = this.initMap;
      } else {
        this.initMap();
      }
    },
    methods: {
      goToUserInputPage() {
        this.$router.push("/UserInput");
      },

      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 16,
          mapId: "4af310b3e8d84ead"
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
            infoWindow.setContent("Your Location");
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
  }},
  }
</script>

<style scoped>
  div #map {
    height: 80vh;
    width: 80vw;
    color: black;
    box-sizing: initial;
  }
</style>