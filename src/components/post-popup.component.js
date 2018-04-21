import Vue from 'vue';
import template from './post-popup.template.html';
import './post-popup.styles.scss';

const unmountPopup = () => {
	console.log('do this with vuex...');
};

export default Vue.extend({
	template,
	props: ['marker'],
	methods: {
		unmountPopup
	},
	mounted() {
		console.log(this.$store);
	}
});
