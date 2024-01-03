<template>
    <nav class="navbar">
      <div class="navbar__title">
        <router-link to="/">MaturaIT Shop</router-link>
      </div>
      <div class="navbar__search">
        <input type="text" v-model="searchQuery" @input="performSearch" placeholder="Search products..." />
        <ul v-if="searchResults.length > 0" class="search-results">
          <li v-for="(product, index) in searchResults" :key="index" @click="goToProductDetails(product.id)">
            {{ product.title }}
          </li>
        </ul>
      </div>
      <div class="navbar__cart" @click="toggleCart">
        <span class="navbar__cart-icon">🛒</span>
        <span v-if="cartItems.length > 0" class="navbar__cart-count">{{ cartItems.length }}</span>
        <div v-if="showCart" class="navbar__cart-dropdown">
          <div v-for="(item, index) in cartItems" :key="index" class="navbar__cart-item">
            {{ item.name }} - ${{ item.price }}
            <button @click="removeFromCart(index)">Remove</button>
          </div>
          <div v-if="cartItems.length > 0" class="navbar__cart-total">
            Total: ${{ getTotalPrice }}
            <button @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NavBar',
    setup() {
      const searchQuery = ref('');
      const showCart = ref(false);
      const cartItems = ref([]);
      const searchResults = ref([]);
      const router = useRouter();
  
      const toggleCart = () => {
        showCart.value = !showCart.value;
      };
  
      const removeFromCart = (index) => {
        cartItems.value.splice(index, 1);
      };
  
      const getTotalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price, 0);
      });
  
      const performSearch = async () => {
        try {
          if (searchQuery.value === '') {
            searchResults.value = [];
            return;
          }
          const response = await fetch(`https://fakestoreapi.com/products`);
          const data = await response.json();
          const filteredProducts = data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
          searchResults.value = filteredProducts;
        } catch (error) {
          console.error('Error searching products:', error);
        }
      };
  
      const checkout = () => {
      };
  
      const goToProductDetails = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const productDetails = await response.json();
    
    router.push({ name: 'ProductDetails', params: { id: productId } });

  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

  
      return {
        searchQuery,
        performSearch,
        showCart,
        cartItems,
        toggleCart,
        removeFromCart,
        getTotalPrice,
        checkout,
        searchResults,
        goToProductDetails,
      };
    },
  };
  </script>
  
  <style>
  .search-results {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 100%;
  }
  
  .search-results li {
    padding: 5px;
    cursor: pointer;
  }
  
  .search-results li:hover {
    background-color: #f0f0f0;
  }
  </style>