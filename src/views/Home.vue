<template>
  <img
    src="../images/rubbish-radar-high-resolution-color-logo.png"
    alt="Rubbish_Radar_Logo_pic"
    style="
      width: 100%;
      top: 35px;
      object-fit: none;
      height: 400px;
      position: absolute;
    "
  />

  <Map />
  <body>
    <div class="userInput">
      <h1 style="text-align: center">Add Trash Can</h1>
      <br />
      <input v-model="additionalInfo" placeholder="Info About Location" />
      <br />
      <button @click="addTrashCan">Add Trash Can</button>
      <!-- <p v-if="location">Trash can added at location: {{location.latitude}}, {{location.longitude}}</p> -->
      <button @click="addRecyclingBin">Add Recycling Bin</button>
      <!-- <p v-if="location">Recycling Bin added at location: {{location.latitude}}, {{location.longitude}}</p> -->
      <button @click="addCombustible">Add Combustable Bin</button>
      <p v-if="location">
        Added at location: {{ location.latitude }}, {{ location.longitude }}
      </p>
    </div>
  </body>
</template>

<script>
import Map from "../components/Map.vue";
import { db } from "../firebaseResources";
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
} from "firebase/firestore";

export default {
  components: { Map },
  data() {
    return {
      additionalInfo: "",
      location: null,
      locArray: [],
    };
  },
  methods: {
    async addTrashCan() {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            info: this.additionalInfo,
            type: "trashcan",
          };

          const docReference = await addDoc(collection(db, "locations"), {
            location: this.location,
          });
        } catch (error) {
          console.error("Error getting location: ", error);
        }
      } else {
        console.error("Location services not available in this browser");
      }
    },
    async addRecyclingBin() {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            info: this.additionalInfo,
            type: "recycling",
          };

          const docReference = await addDoc(collection(db, "locations"), {
            location: this.location,
          });
        } catch (error) {
          console.error("Error getting location: ", error);
        }
      } else {
        console.error("Location services not available in this browser");
      }
    },
    async addCombustible() {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            info: this.additionalInfo,
            type: "combustibles",
          };

          const docReference = await addDoc(collection(db, "locations"), {
            location: this.location,
          });
        } catch (error) {
          console.error("Error getting location: ", error);
        }
      } else {
        console.error("Location services not available in this browser");
      }
    },
  },
};
</script>

<style scoped>
#map {
  height: 80vh;
  width: 80vw;
  color: black;
  margin-top: 30%;
}
</style>
