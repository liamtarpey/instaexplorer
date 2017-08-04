<template>
    <a href="#" v-on:click="authoriseInstagram($event)">Click here to authorise instagram</a>
</template>

<script>
    const clientId = 'cce4eca21df542df9b0e6301f91939f7';
    const redirectUri = 'http://localhost:8080/explore';
    const instagramRoute = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=token';

    const authoriseInstagram = (e) => {
        e.preventDefault();
        window.location.href = instagramRoute;
    };

    const AuthComponent = {
        name: 'Auth',
        data: function() {
            return {};
        },
        methods: {
            authoriseInstagram: authoriseInstagram
        }
    };

    export default AuthComponent;
</script>
