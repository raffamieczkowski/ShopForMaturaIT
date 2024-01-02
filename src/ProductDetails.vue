<template>
    <div>
      <div v-if="loading" class="product-details__loading">Loading...</div>
      <div v-else class="product-details">
        <h2>{{ product.title }}</h2>
        <img :src="product.image" :alt="product.title" class="product-details__image" />
        <p>Price: ${{ product.price }}</p>
        <p>Category: {{ product.category }}</p>
        <p>Description: {{ product.description }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const loading = ref(true);
  const product = ref(null);
  const router = useRouter();
  
  const cartItems = ref([]);
  
  const fetchProductDetails = async () => {
    try {
      const productId = router.currentRoute.value.params.id;
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      product.value = data;
      loading.value = false;
    } catch (error) {
      console.error('Error fetching product details:', error);
      loading.value = false;
    }
  };
  
  fetchProductDetails();
  
  const addToCart = (product) => {
    cartItems.value.push(product);
  };
  
  </script>
  
  <style>
  </style>
  