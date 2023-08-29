<template>
  <img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 100%; top: 35px; object-fit: none; height: 400px; position: absolute;">

    <Map></Map>
      <body>
        <div class="userInput">
          <h1 style="text-align: center;">Add Trash Can</h1>
          <br>
          <input v-model="additionalInfo" placeholder="Info About Location">
          <br>
          <button @click="addTrashCan">Add Trash Can</button>
          <!-- <p v-if="location">Trash can added at location: {{location.latitude}}, {{location.longitude}}</p> -->
          <button @click="addRecyclingBin">Add Recycling Bin</button>
          <!-- <p v-if="location">Recycling Bin added at location: {{location.latitude}}, {{location.longitude}}</p> -->
          <button @click="addCombustible">Add Combustable Bin</button>
          <p v-if="location">Added at location: {{location.latitude}}, {{location.longitude}}</p>
        </div>
      </body>
</template>

<script>

import Map from "../components/Map.vue"
import { db } from "../firebaseResources"
import {
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore'

  export default {
    components: { Map },
    data(){
      return {
          additionalInfo: '',
          location: null,
          locArray: [],
      };
    },
    mounted() {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkgbhppn40r-DjzpnkAg0q7waZKQzsr8&callback=initMap&map_ids=74db84a2f64c1375';
        document.body.appendChild(script);
        script.onload = () => {
          this.getLocations();
          this.initMap();
        };
      } else {
        this.getLocations();
        this.initMap();
      }
    },
    methods: {
      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 16,
          mapId: "74db84a2f64c1375",
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


          for(let i = 0; i < this.locArray.length; i ++){
            let type = this.locArray[i].type;
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.locArray[i].latitude, this.locArray[i].longitude),
              map: map
          });


          google.maps.event.addListener(marker, 'click', (function(marker, i){
          return function(){
            infoWindow.setContent(locArray[i].info);
            infoWindow.open(map, marker);
          }
          })(marker, i));
        }
   
      let greenMarker = '../images/greenMarker.png';
      let myLatLng = new google.maps.LatLng(35.7148, 139.7967);
      let marker = new google.maps.Marker({
        position: myLatLng,
        title : "trashbin by Sensoji"
        // icon: greenMarker
      });


      marker.setMap(map);
    },
    async addTrashCan() {
      if("geolocation" in navigator){
          try{
              const position = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
              });

              this.location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  info: this.additionalInfo,
                  type: 'trashcan'
              };

              const docReference = await addDoc(
                  collection(db, 'locations'),
                  {
                      location: this.location,
                  }
              );
          } catch (error) {
              console.error("Error getting location: ", error);
          }
      } else {
          console.error("Location services not available in this browser")
      }
    },
    async addRecyclingBin() {
      if("geolocation" in navigator){
          try{
              const position = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
              });

              this.location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  info: this.additionalInfo,
                  type: 'recycling',
              };

              const docReference = await addDoc(
                  collection(db, 'locations'),
                  {
                      location: this.location,
                  }
              );
          } catch (error) {
              console.error("Error getting location: ", error);
          }
      } else {
          console.error("Location services not available in this browser")
      }
    },
    async addCombustible() {
      if("geolocation" in navigator){
          try{
              const position = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
              });

              this.location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  info: this.additionalInfo,
                  type: 'combustibles'
              };

              const docReference = await addDoc(
                  collection(db, 'locations'),
                  {
                      location: this.location,
                  }
              );
          } catch (error) {
              console.error("Error getting location: ", error);
          }
      } else {
          console.error("Location services not available in this browser")
      }
    },
    async getLocations(){
      try {
        const locCollection = collection(db, 'locations');
        const locationDocs = await getDocs(locCollection);
        this.locArray = locationDocs.docs.map(doc => doc.data().location);
      } catch (error){
        console.error("Error getting location: ", error);
      }
    },
  },
}
</script>

<style scoped>
  #map {
    height: 80vh;
    width: 80vw;
    color: black;
    margin-top: 30%;
  }
</style>