<template>
  <div class="checkout">
    <h2>Checkout</h2>
    <div v-if="cartItems.length === 0" class="checkout__empty">Your cart is empty</div>
    <div v-else class="checkout__items">
      <div v-for="(item, index) in cartItems" :key="index" class="checkout__item">
        <span>{{ item.name }} - ${{ item.price }}</span>
        <button @click="removeFromCart(index)">Remove</button>
      </div>
      <div v-if="cartItems.length > 0" class="checkout__total">
        Total: ${{ getTotalPrice }}
        <button @click="buyNow">Buy Now</button>
      </div>
    </div>
    <div v-if="paymentSuccess" class="checkout__success">
      Payment SUCCESS!!!
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'CheckoutSection',
  setup() {
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

    const removeFromCart = (index) => {
      cartItems.value.splice(index, 1);
      updateLocalStorage();
    };

    const getTotalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price, 0);
    });

    const buyNow = () => {
      // DODAJ LOGIKĘ PŁATNOŚCI
      paymentSuccess.value = true;
    };

    const paymentSuccess = ref(false);

    const updateLocalStorage = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    };

    return {
      cartItems,
      removeFromCart,
      getTotalPrice,
      buyNow,
      paymentSuccess
    };
  }
};
</script>

<style>
/* DODAJ STYLE */
</style>
