import template from './authentication.template.html';
import './authentication.styles.scss';

// Private vars
const clientId = 'cce4eca21df542df9b0e6301f91939f7';
const redirectUri = 'http://localhost:8080/explore';
const instagramRoute = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;

/**
 * Click event handler for the log in button
 * Redirects user to authorised app on success
 * @param {Event} e
 */
const authoriseInstagram = (e) => {

    if (e) {
        e.preventDefault();
    }

    return window.location.replace(instagramRoute);
};

export default {
    template,
    methods: {
        authoriseInstagram
    }
};
