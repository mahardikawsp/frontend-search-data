import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/sass/app.sass';
import vueClickOutsideElement from 'vue-click-outside-element';
import App from './App.vue';

const app = createApp(App);

app.use(vueClickOutsideElement);
app.use(createPinia());

app.mount('#app');
