<template>
    <div>
        <div id="map" class="map-container"></div>
        <a href="#" class="next-button" v-on:click="nextPost($event)"></a>
    </div>
</template>

<script>

    let vm = null;
    //var instagramAccessToken = window.accessTokens.instagram;
    const instagramAccessToken = 'SOMETHING';
    const mapboxToken = 'pk.eyJ1IjoibGlhbXRhcnBleSIsImEiOiJKZXQyZWo4In0.IQ_GWGCoQ7tFph0iFY-aQw';
    const selfEndpoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramAccessToken;

    let instaData = [];
    let counter = 0;
    let map = null;
    const sanFrancisco = [ -122.420679, 37.772537 ];

    const loadMapbox = () => {
        mapboxgl.accessToken = mapboxToken;
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: sanFrancisco,
            zoom: 13
        });
    };

    const getInstaData = () => {
        const onSuccess = (response) => {
            for(var i= 0, l= response.data.length; i<l; i++) {
                if(response.data[i].location) {
                    instaData.push(response.data[i]);
                }
            }
        };

        const onError = (error) => {
            console.log(error);
        };

        fetchJsonp(selfEndpoint)
            .then(function(response) {
                return response.json()
            }).then(onSuccess, onError);
    };


    let el = null;
    let img = null;
    let details = null;

    const nextPost = (e) => {
        e.preventDefault();

        if(el && img) {
            el.remove();
        }

        let location = [];
        location.push(instaData[counter].location.longitude);
        location.push(instaData[counter].location.latitude);
        const image = instaData[counter].images.standard_resolution.url;
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

    const ExploreComponent = {
        name: 'Explore',
        data: function() {
            return {};
        },
        mounted: function() {
           vm = this;

        //    loadMapbox();
        //    getInstaData();
        },
        methods: {
            nextPost: nextPost
        }
    };

    export default ExploreComponent;
</script>
