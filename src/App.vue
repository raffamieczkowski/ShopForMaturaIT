<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
/* dodaj style */
</style>