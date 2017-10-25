<template>
    <div>
        <Mapbox markers=""></Mapbox>
        <a href="#" class="next-button" v-on:click="nextPost($event)"></a>
    </div>
</template>

<script>
    import _ from 'lodash';
    import axios from 'axios';
    import fetchJsonp from 'fetch-jsonp';
    import EndpointBuilder from '../common/endpoint-builder.js';
    import Mapbox from '../components/Mapbox.vue';

    // Private vars
    let instagramAccessToken = null;

    /**
     * Add each marker returned by instagram to the map.
     * @param {Object} data object | contains each instagram checkin
     */
    const addMarkers = (data) => {
        _.each(data, function(marker) {
            if(marker.location) {
                let el = document.createElement('mapmarker');
                el.setAttribute('post-id', marker.id);
                el.className = 'custom-marker';
                new mapboxgl.Marker(el)
                    .setLngLat([marker.location.longitude, marker.location.latitude])
                    .addTo(map);
            }
        });
    };

    /**
     * Gets all instagram data
     * We fetch with JsonP as this is only supported
     * On success we call our addMarkers function that displays
     * each marker on our map.
     */
    const getInstagramData = () => {
        const onSuccess = (response) => {
            addMarkers(response.data);
        };

        const onError = (error) => {
            console.log(error);
        };

        // Build endpoint
        const Endpoint = new EndpointBuilder();
        let url = Endpoint.build('instagram', 'self');
        url += '?access_token=' + instagramAccessToken;

        // Fetch all instagram data
        fetchJsonp(url).then(function(response) {
            return response.json();
        }).then(onSuccess, onError);
    };

    export default {
        mounted: function() {

            // Get access token from url and split
            instagramAccessToken = this.$route.hash;

            // Redirect home if no token is found
            if(!_.includes(instagramAccessToken, 'access_token')) {
               this.$router.push({ name: 'home' });
               return false;
            }

            // Store access token
            instagramAccessToken = instagramAccessToken.split('=')[1];

            getInstagramData();
        },
        data: {

        },
        components: {
            Mapbox
        }
    };
</script>

<style media="screen">
    .custom-marker {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background: red;
    }
    .custom-marker:hover {
        cursor: pointer;
    }
</style>
