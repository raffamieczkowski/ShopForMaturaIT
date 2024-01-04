import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ProductList from './ProductList.vue';
import ProductDetails from './ProductDetails.vue';
import Checkout from './Checkout.vue';
import store from './store.js';

const app = createApp(App);

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/checkout', component: Checkout }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

app.use(router);
app.use(store);

app.mount('#app');