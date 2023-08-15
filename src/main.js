import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyBXgokapngeS3mM4RaZfYr8fCIvKshSdzk"
    },
    installComponents: true,
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
