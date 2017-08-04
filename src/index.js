// Import libs
import Vue from 'vue';
import VueRouter from 'vue-router';

// import mapboxgl from './node_modules/mapbox-gl/dist/mapbox-gl.js'; // npm install broken?

// Import App
import App from './App.vue';

// Import Views
import Auth from './views/Auth.vue';
import Explore from './views/Explore.vue';

// Use router
Vue.use(VueRouter);

// Define all routes
const routes = [
    {
        name: 'home',
        path: '/',
        component: Auth
    },
    {
        name: 'explore',
        path: '/explore',
        component: Explore
    }
];

// Initalise router
const router = new VueRouter({
    routes,
    mode: 'history'
});

// Init app
const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
