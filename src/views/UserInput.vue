<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="userInput">
        <h1>Add Trash Can</h1>
        <br>
        <input v-model="additionalInfo" placeholder="Info About Trash Can Location">
        <br>
        <button @click="addTrashCan">Add Current Location</button>
        <p v-if="location">Trash can added at location: {{location.latitude}}, {{location.longitude}}</p>
    </div>
</template>

<style>
    body {
        text-align: center;
    }

</style>


<script>
    import { ref } from 'vue';

    export default {
        data(){
            return {
                additionalInfo: '',
                location: null,
            };
        },
        methods: {
            addTrashCan(){
                if("geolocation" in navigator){
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            this.location = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            };
                        },
                        error => {
                            console.error("Error getting location: ", error.message)
                        }
                    );
                } else {
                    console.error("Location services not available in this browser")
                }
            },
        },
    };
    


</script>