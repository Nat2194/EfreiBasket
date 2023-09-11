import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
