<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <body>
        <div>
            <h1>Add Trash Can</h1>
            <br>
            <input v-model="additionalInfo" placeholder="Info About Trash Can Location">
            <br>p
            <button @click="addTrashCan">Add Current Location</button>
        </div>
    </body>
</template>

<style>
    body {
        text-align: center;
    }

</style>


<script>
    import { ref } from 'vue';

    const additionalInfo = ref('');

    const addTrashCan = () => {
        
    }


</script>