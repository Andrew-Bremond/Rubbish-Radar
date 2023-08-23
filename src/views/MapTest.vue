<template>
    <div id="container">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import {ref} from "vue"
  import {db} from "../firebaseResources"
  import {
    collection,
    getDocs,
  } from "firebase/firestore"

  export default {
    name: 'MapTest',
    data() {
      return {
        trashCans: [],
        recyclingBins: [],
        combustibleBins: [],
      }
    },
    mounted() {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkgbhppn40r-DjzpnkAg0q7waZKQzsr8&callback=initMap';
        document.body.appendChild(script);
        script.onload = this.initMap;
      } else {
        this.initMap();
      }
      this.getLocations();
    },
    methods: {
      initMap() {
        let mapOptions = {
          center: { lat: 41, lng: -87 },
          zoom: 12
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions); 

      },

      async getLocations(){
        try {
          const trashCollection = collection(db, 'trashcans');
          const recyclingCollection = collection(db, 'recyclingbins');
          const combustibleCollection = collection(db, 'combustiblebins');

          let trashCansDoc = await getDocs(trashCollection);
          this.trashCans = trashCansDoc.docs.map(doc => doc.data().location);

          let recyclingDoc = await getDocs(recyclingCollection);
          this.recyclingBins = recyclingDoc.docs.map(doc => doc.data().location);

          let combustibleDoc = await getDocs(combustibleCollection);
          this.combustibleBins = combustibleDoc.docs.map(doc => doc.data().location);
        } catch (error){
          console.error("Error getting location: ", error);
        }
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
  