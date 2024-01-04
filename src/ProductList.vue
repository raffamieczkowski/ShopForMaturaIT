<template>
  <div class="product-list">
    <!-- ... -->
    <div v-if="!loading" class="product-list__items">
      <div v-for="product in filteredProducts" :key="product.id" class="product-list__item">
        <img :src="product.image" :alt="product.title" class="product-list__item-image" />
        <h3>{{ product.title }}</h3>
        <p>Price: ${{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance } from 'vue';

const appContext = getCurrentInstance();

const searchQuery = ref('');
const loading = ref(true);
const products = ref([]);
const filteredProducts = ref([]);

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products.value = data;
    filteredProducts.value = data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching products:', error);
    loading.value = false;
  }
};

onMounted(fetchProducts);

watch(searchQuery, (newValue) => {
  filteredProducts.value = products.value.filter((product) =>
    product.title.toLowerCase().includes(newValue.toLowerCase())
  );
});

const addToCart = (product) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  console.log('Dodano produkt do koszyka:', product);
  console.log('Aktualna zawartość koszyka:', cartItems);

  if (appContext) {
    appContext.emit('cartItemAdded', cartItems);
  }
};
</script>

<style>
</style>
