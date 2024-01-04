<template>
  <div class="product-list">
    <!-- ... -->
    <div v-if="!loading" class="product-list__items">
      <div v-for="product in filteredProducts" :key="product.id" class="product-list__item">
        <img :src="product.image" :alt="product.title" class="product-list__item-image" />
        <h3>{{ product.title }}</h3>
        <p>Price: ${{ product.price }}</p>
        <!-- <p>Rating: {{ product.rating }}</p> -->
        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">View Details</router-link>
        <!-- <button @click="addToCart(product)">Add to Cart</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// import { useRouter } from 'vue-router';

const searchQuery = ref('');
const loading = ref(true);
const products = ref([]);
const filteredProducts = ref([]);

// const router = useRouter();

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

// const addToCart = (product) => {
  // dodaj logikę tutaj
// };
</script>

<style>
</style>
