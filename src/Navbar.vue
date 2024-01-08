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

    <div class="navbar__cart-icon" @click="toggleCart">
    🛒
    <span v-if="cartItems.length > 0" class="navbar__cart-count">{{ cartItems.length }}</span>
  </div>

  <div v-if="showCart" class="navbar__cart-dropdown">
    <div v-if="cartItems.length === 0" class="navbar__cart-empty">Koszyk jest pusty.</div>
    <div v-else>
      <div v-for="(item, index) in cartItems" :key="index" class="navbar__cart-item">
        {{ item.name }} - ${{ item.price }}
        <button @click="removeFromCart(index)">Usuń</button>
      </div>
      <!-- <div class="navbar__cart-total">
        Całkowita cena: ${{ getTotalPrice }}
        <router-link :to="{ name: 'Checkout' }">
          <button>Przejdź do Checkout</button>
        </router-link>
      </div> -->
    </div>
  </div>

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
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  components: {
    CartItems,
  },
  setup() {
    const store = useStore();
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
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
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

.navbar {
  /* DODAJ STYLE */
}

.navbar__title {
  /* DODAJ STYLE*/
}

.navbar__cart-icon {
  /* DODAJ STYLE */
}

.navbar__cart-count {
  /* DODAJ STYLE */
}

.navbar__cart-dropdown {
  /* DODAJ STYLE */
}

.navbar__cart-item {
  /* DODAJ STYLE */
}

</style>
