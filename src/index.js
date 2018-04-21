import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store/store.js';
import App from './App.vue';
import Authentication from './containers/authentication.component.js';
import Explore from './containers/explore.component.js';
import './styles/_imports.scss';

Vue.use(VueRouter);

// Define all routes
const routes = [
    {
        name: 'home',
        path: '/',
        component: Authentication
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
    store,
    router,
    render: h => h(App)
});
