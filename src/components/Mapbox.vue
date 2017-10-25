<template>
    <div id="map" class="map-container"></div>
</template>

<script>

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

    export default {
        mounted: function() {
            loadMapbox();
        }
    }
</script>
