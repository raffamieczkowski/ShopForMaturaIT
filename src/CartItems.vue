<template>
    <div>
      <div v-if="cartItems.length > 0" class="navbar__cart-dropdown">
        <div v-for="(item, index) in cartItems" :key="index" class="navbar__cart-item">
          {{ item.name }} - ${{ item.price }}
          <button @click="removeFromCart(index)">Remove</button>
        </div>
        <div class="navbar__cart-total">
          Total: ${{ getTotalPrice() }}
          <button @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'CartItems',
    props: {
      cartItems: {
        type: Array,
        required: true,
      },
      removeFromCart: {
        type: Function,
        required: true,
      },
      getTotalPrice: {
        type: Function,
        required: true,
      },
      checkout: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const cartItems = ref(props.cartItems);
  
      watch(() => localStorage.getItem('cartItems'), (newVal) => {
        const parsedCartItems = JSON.parse(newVal);
        cartItems.value = parsedCartItems || [];
      });
  
      return {
        cartStoreItems,
      };
    },
  };
  </script>
  
  <style>
  /* dodaj style */
  </style>
  