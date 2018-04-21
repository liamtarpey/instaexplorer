import Vue from 'vue';
import template from './map.template.html';
import MarkerComponent from './marker.component.js';

// Private vars
let map = null;
const londonCoords = [-0.123499506, 51.504831314];
const mapboxToken = 'pk.eyJ1IjoibGlhbXRhcnBleSIsImEiOiJKZXQyZWo4In0.IQ_GWGCoQ7tFph0iFY-aQw';

// Initialise instance of mapbox with London coordinates as default
const loadMapbox = () => {
    mapboxgl.accessToken = mapboxToken;
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: londonCoords,
        zoom: 2
    });
};

/**
 * Place all markers on the map
 * First we create two DOM elements
 * The second one gets replaced when injecting
 * a component with vue and we need the first
 * to ensure it keeps the CSS properties (positioning)
 * that mapbox gives it when it initiates the marker
 * @param {Array} markers
 */
const placeMarkers = (markers) => {
    _.each(markers, (marker) => {

        const el = document.createElement('div');
        const subEl = document.createElement('div');
        el.appendChild(subEl);
        const propsData = { marker };

        new mapboxgl.Marker(el)
            .setLngLat([marker.location.longitude, marker.location.latitude])
            .addTo(map);

        new MarkerComponent({ propsData }).$mount(subEl);
    });
};

export default {
    template,
    props: ['markers'],
    mounted() {
        loadMapbox();
        placeMarkers(this.markers);
    }
}
