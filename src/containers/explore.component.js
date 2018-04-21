import _ from 'lodash';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import EndpointBuilder from '../common/endpoint-builder.js';
import Mapbox from '../components/map.component.js';
import template from './explore.template.html';

// Private vars
let vm = null;
let instagramAccessToken = null;

/**
 * Gets all instagram data
 * We fetch with JsonP as this is only supported
 * On success we call our addMarkers function that displays
 * each marker on our map.
 */
const getInstagramData = () => {

    let maxId = null;

    const onSuccess = (response) => {

        _.each(response.data, (marker) => {
            if (marker.location) {
                vm.markers.push(marker);
            }
        });

        if (response.data.length) {
            maxId = _.last(response.data).id;
            getNextBatch();
        }
    };

    const onError = (error) => {
        throw error;
    };

    // Fetch all instagram data
    const getNextBatch = (posts) => {

        // Build endpoint
        const Endpoint = new EndpointBuilder();
        let url = Endpoint.build('instagram', 'self');
        url += `?access_token=${instagramAccessToken}`;

        if (maxId) {
            url += `&max_id=${maxId}`;
        }

        fetchJsonp(url).then((response) => {
            return response.json();
        }).then(onSuccess).catch(onError);
    };

    getNextBatch();
};

export default {
    template,
    mounted() {

        vm = this;

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
    data(){
        return {
            markers: []
        };
    },
    methods: {
        getInstagramData
    },
    components: {
        Mapbox
    }
};
