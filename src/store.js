import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cartItems: [],
    };
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push(product);
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
  },
  actions: {
    updateCartItems({ commit }, cartItems) {
      commit('setCartItems', cartItems);
    },
    addProductToCart({ commit, state }, product) {
      const updatedCart = [...state.cartItems, product];
      commit('addToCart', product);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    },
    fetchCartItems({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      commit('setCartItems', cartItems);
    },
  },
  getters: {
    cartItemCount(state) {
      return state.cartItems.length;
    },
  },
});

export default store;
