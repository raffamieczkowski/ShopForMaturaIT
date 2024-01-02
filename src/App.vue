<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const ProductList = defineAsyncComponent(() => import('./ProductList.vue'));
const ProductDetails = defineAsyncComponent(() => import('./ProductDetails.vue'));
const Checkout = defineAsyncComponent(() => import('./Checkout.vue'));

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetails },
  { path: '/checkout', component: Checkout }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default {
  components: {
    Navbar
  },
  setup() {
    return {
      router
    };
  }
};
</script>

<style>
</style>
