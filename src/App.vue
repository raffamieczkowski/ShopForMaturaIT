<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProductDetails from './ProductDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true,
    }
    /* dodaj TRASY!!! */
  ]
});

export default {
  components: { Navbar },
  setup() {
    return { router };
  }
};
</script>

<style>
/* DODAJ STYLE */
</style>