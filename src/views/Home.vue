<template>
<img src="../images/rubbish-radar-high-resolution-color-logo.png" alt="Rubbish_Radar_Logo_pic" 
    style = "width: 101%; margin-top: -675px; object-fit: none; height: 400px;">
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
    }
  }
</script>

<style scoped>
</style>