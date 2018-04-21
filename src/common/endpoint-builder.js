import Endpoints from '../constants/endpoints.constants.js';

export default class Endpoint {

    build(type, endpoint) {
        if(!Endpoints[type] || !Endpoints[type][endpoint]) {
            console.log('Endpoint does not exist!');
            return null;
        }

        return Endpoints[type][endpoint];
    };
};
