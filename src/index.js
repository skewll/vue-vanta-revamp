import Vanta from './Vanta.vue';
export default Vanta;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('v-vanta', Vanta);
}