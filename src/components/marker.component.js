import Vue from 'vue';
import template from './marker.template.html';
import PostPopupComponent from './post-popup.component.js';

/**
 * Triggers a popup to open with
 * the current marker details
 * @param {Object} marker
 */
const openPopup = (marker) => {
	const propsData = { marker };
	const markerIdentifier = document.getElementById('js-post-popup-container');
	new PostPopupComponent({ propsData }).$mount(markerIdentifier);
};

export default Vue.extend({
    template,
    props: ['marker'],
    methods: {
    	openPopup
    }
});
