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

    <span class="navbar__cart-icon" @click="toggleCart">
      🛒
      <span v-if="cartItems.length > 0" class="navbar__cart-count">{{ cartItems.length }}</span>
    </span>
    <CartItems
      v-if="showCart"
      :cartItems="cartItems"
      :removeFromCart="removeFromCart"
      :getTotalPrice="getTotalPrice"
      :checkout="checkout"
    />
    <div class="cartList" v-if="showCart">
      <h3>Cart Contents:</h3>
      <ul>
        <li v-for="(item, index) in cartItems" :key="'cart_' + index">
          {{ item.name }} - ${{ item.price }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import CartItems from './CartItems.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Dodaj import

export default {
  name: 'NavBar',
  components: {
    CartItems,
  },
  setup() {
    const store = useStore(); // Użyj store Vuex

    const searchQuery = ref('');
    const showCart = ref(false);
    const searchResults = ref([]);
    const router = useRouter();

    const toggleCart = () => {
      showCart.value = !showCart.value;
    };

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

    const goToProductDetails = async (productId) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const productDetails = await response.json();
        
        router.push({ name: 'ProductDetails', params: { id: productId } });
        searchResults.value = [];
        searchQuery.value = '';

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    // Poniżej logika dodawania, usuwania i aktualizacji koszyka za pomocą Vuex
    const addToCart = (product) => {
      store.commit('addToCart', product);
    };

    const removeFromCart = (index) => {
      store.commit('removeFromCart', index);
    };

    const getTotalPrice = computed(() => {
      return store.getters.getTotalPrice;
    });

    const cartItems = computed(() => {
      return store.state.cartItems;
    });

    const checkout = () => {
      // Logika płatności dodaj tutaj!!!
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
      addToCart,
    };
  },
};
</script>

<style>
/* dodaj style */
.cartList {
  background-color: red;
  width: 300px;
  height: 300px;
}

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
