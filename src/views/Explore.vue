<template>
    <div>
        <div id="map" class="map-container"></div>
        <a href="#" class="next-button" v-on:click="nextPost($event)"></a>
    </div>
</template>

<script>
    import fetchJsonp from 'fetch-jsonp';
    import axios from 'axios';
    import VueRouter from 'vue-router';

    let vm = null;
    let instagramAccessToken = null;
    let selfEndpoint = null;
    let instaData = [];
    let counter = 0;
    let map = null;
    let minInstaId = null;
    const londonCoords = [-0.123499506, 51.504831314];
    const mapboxToken = 'pk.eyJ1IjoibGlhbXRhcnBleSIsImEiOiJKZXQyZWo4In0.IQ_GWGCoQ7tFph0iFY-aQw';

    const loadMapbox = () => {
        mapboxgl.accessToken = mapboxToken;
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: londonCoords,
            zoom: 13
        });
    };

    const getInstaData = () => {
        const onSuccess = (response) => {
            for(var i= 0, l= response.data.length; i<l; i++) {
                if(response.data[i].location) {
                    instaData.push(response.data[i]);
                    minInstaId = response.data[i].id; // just keep updating the id until the last one
                }
            }
            console.log(instaData);
        };

        const onError = (error) => {
            console.log(error);
        };

        let url = selfEndpoint;
        if(minInstaId) {
            url = url + '&min_id=' + minInstaId
            console.log('min id reached: ', url);
        }

        fetchJsonp(url)
            .then(function(response) {
                return response.json()
            }).then(onSuccess, onError);
    };


    let el = null;
    let img = null;
    let details = null;

    const nextPost = (e) => {
        e.preventDefault();

        if(counter === instaData.length && minInstaId) {
            getInstaData();
            return false;
        }

        if(el && img) {
            el.remove();
        }

        let location = [];
        location.push(instaData[counter].location.longitude);
        location.push(instaData[counter].location.latitude);
        const image = instaData[counter].images.standard_resolution.url;
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

    const ExploreComponent = {
        name: 'Explore',
        data: function() {
            return {}
        },
        mounted: function() {
           vm = this;

           // Get access token from url and split
           instagramAccessToken = vm.$route.hash;

           if(instagramAccessToken.indexOf('access_token') === -1) {
               this.$router.push({ name: 'home' });
               return false;
           }

           instagramAccessToken = instagramAccessToken.split('=')[1];
           selfEndpoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramAccessToken + '&count=10000';

           // Init mapbox
           loadMapbox();

           // Get instagram data
           getInstaData();
        },
        methods: {
            nextPost: nextPost
        }
    };

    export default ExploreComponent;
</script>
