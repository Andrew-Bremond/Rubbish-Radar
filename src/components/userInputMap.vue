<template>
    <div class = "userInput">
          <input v-model="additionalInfo" placeholder="Info About Location">
          <input v-model="latit" placeholder="Latitude">
          <input v-model="longit" placeholder="Longitude">
          <br>
          <button class = "trashButtons" @click="addCustom"> Add Bin </button>
          <p v-if="location">Added at location: {{location.latitude}}, {{location.longitude}}</p>
    </div>
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
    methods: {
async addCustom() {
      if("geolocation" in navigator){
          try{
              const position = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
              });

              this.location = {
                  latitude: this.latit,
                  longitude: this.longit,
                  info: this.additionalInfo,
                  type: 'customBin',
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
    }
}
}
</script>