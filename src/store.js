import { createStore } from 'vuex';

const store = createStore({
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push(product);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
    removeFromCart(state, index) {
      state.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export default store;