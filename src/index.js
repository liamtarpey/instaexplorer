import Vue from 'vue';
import fetchJsonp from 'fetch-jsonp';
import axios from 'axios';
// import mapboxgl from './node_modules/mapbox-gl/dist/mapbox-gl.js'; // npm install broken?

var vm = null;
var instagramAccessToken = window.accessTokens.instagram;
var mapboxToken = window.accessTokens.mapbox;

var selfEndpoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramAccessToken;
var instaData = [];
var counter = 0;
var map = null;
var sanFrancisco = [ -122.420679, 37.772537 ];

var loadMapbox = function() {
    mapboxgl.accessToken = mapboxToken;
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: sanFrancisco,
        zoom: 13
    });
};

var getInstaData = function() {
    var onSuccess = function(response) {
        for(var i= 0, l= response.data.length; i<l; i++) {
            if(response.data[i].location) {
                instaData.push(response.data[i]);
            }
        }
    };

    var onError = function(error) {
        console.log(error);
    };

    fetchJsonp(selfEndpoint)
        .then(function(response) {
            return response.json()
        }).then(onSuccess, onError);
};

var el = null;
var img = null;
var details = null;

var nextPost = function(e) {
    e.preventDefault();

    if(el && img) {
        el.remove();
    }

    var location = [];
    location.push(instaData[counter].location.longitude);
    location.push(instaData[counter].location.latitude);
    var image = instaData[counter].images.standard_resolution.url;
    console.log(instaData[counter]);
    map.flyTo({
        center: location
    });

    el = document.createElement('div');
    img = document.createElement('img');
    details = document.createElement('div');

    details.innerHTML = '<p>' + instaData[counter].caption.text + '</p>';

    el.id = 'marker-' + counter;
    el.className = 'marker';
    img.src = image;

    el.appendChild(img);
    el.appendChild(details);

    new mapboxgl.Marker(el, {offset:[-25, -25]})
        .setLngLat(location)
        .setPopup(popup)
        .addTo(map);

        var popup = new mapboxgl.Popup({offset: 25})
            .setText('Construction on the Washington Monument began in 1848.');

    counter ++;
};

var app = new Vue({
    el: '#app',
    data: {},
    mounted: function() {
        vm = this;

        loadMapbox();
        getInstaData();
    },
    methods: {
        nextPost: nextPost
    }
});
