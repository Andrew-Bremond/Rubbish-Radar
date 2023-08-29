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

import { FirebaseError } from "firebase/app";
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
    QuerySnapshot,
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
    async mounted() {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkgbhppn40r-DjzpnkAg0q7waZKQzsr8&callback=initMap&map_ids=74db84a2f64c1375';
        document.body.appendChild(script);
        script.onload = async() => {
          await this.getLocations();
          this.initMap();
          console.log(this.locArray);
        };
      } else {
        await this.getLocations();
        this.initMap();
      }
    },
    methods: {
      initMap() {
        // let mapOptions = {
        //   center: { lat: 41, lng: -87 },
        //   zoom: 16,
        //   mapId: "74db84a2f64c1375",
        // }
        const map = new google.maps.Map(document.getElementById('map'),
        {
          center: { lat: 41, lng: -87 },
          zoom: 16,
          mapId: "74db84a2f64c1375",
        });


        const infoWindow = new google.maps.InfoWindow({
          content: "",
          position: null,
          map,
        });


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
            position: new google.maps.LatLng(this.locArray[i].location.latitude, this.locArray[i].location.longitude),
            map: map
          });

          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function(){
          // return function(){
          //   infoWindow.setContent(locArray[i].info);
          //   infoWindow.open(map, marker);
          // }
            infoWindow.setContent('<p> locArray[i].location.info </p>' + '<br>' + '<button @click="upvote">Upvote</button>'
             + '<button @click="downvote">Downvote</button>');

            infoWindow.open(map, this);
          });

          google.maps.event.trigger(marker, 'click');
        }
   
      let greenMarker = "Rubbish-Radar/RubbishRadar/blob/master/src/images/greenMarker.png";
      let myLatLng = new google.maps.LatLng(35.7148, 139.7967);
      let staticMarker = new google.maps.Marker({
        position: myLatLng,
        title : "trashbin by Sensoji",
        icon: greenMarker
      });
      // google.maps.event.addListener(staticMarker, 'click', function(){
      //   infoWindow.setContent('<p> this.locArray[i].info </p>' + '<br>' + '<button @click="upvote">Upvote</button>'
      //     + '<button @click="downvote">Downvote</button>');

      //   infoWindow.open(map, this);
      // });

      // google.maps.event.trigger(staticMarker, 'click');

       staticMarker.setMap(map);
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
                  type: 'trashcan',
                  upvoteCount: 0,
                  downvoteCount: 0,
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
                  upvoteCount: 0,
                  downvoteCount: 0,
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
                  type: 'combustibles',
                  upvoteCount: 0,
                  downvoteCount: 0,
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
        locationDocs.forEach(doc => {
          this.locArray = [...this.locArray, doc.data()];
        });
      } catch (error){
        console.error("Error getting location: ", error);
      }
    },
    async upvote(){

    },
    async downvote(){

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