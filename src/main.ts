import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import {createPinia} from "pinia";

console.log("Vmail App - Vue3 , TS, PINIA");

createApp(App).use(createPinia()).use(router).mount('#app')
