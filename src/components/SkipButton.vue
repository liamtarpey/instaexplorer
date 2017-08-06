<template>
    <a href="#" v-on:click="skipPost($event)">{{ dirText }}</a>
</template>

<script>
    let vm = null;

    const skipPost = (e) => {
        e.preventDefault();

        if(vm.$data.dirValue === 'prev') {
            $this.props.callback();
        } else {
            $this.props.callback();
        }
    };

    const setDirInfo = () => {
        const direction = this.$props.direction;
        console.log('direction: ', direction);

        switch(direction) {
            case 'left':
                vm.$data.dirValue = 'prev';
                vm.$data.dirText = '&lt;';
                break;
            case 'right':
                vm.$data.dirValue = 'next';
                vm.$data.dirText = '&gt;';
                break;
        }
    };

    const SkipButton = {
        name: 'SkipButton',
        props: ['direction', 'callback'],
        data: function() {
            return {
                dirValue: null,
                dirText: null
            }
        },
        mounted: function() {
            vm = this;

            setDirInfo();
        },
        methods: {
            skipPost: skipPost
        }
    };

    export default SkipButton;
</script>
