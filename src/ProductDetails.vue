<template>
  <div>
    <div v-if="loading" class="product-details__loading">Loading...</div>
    <div v-else class="product-details">
      <h2>{{ product.title }}</h2>
      <img :src="product.image" :alt="product.title" class="product-details__image" />
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Rating: {{ product.rating }}</p>
      <p>Description: {{ product.description }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
      
      <div class="comment-section">
        <input type="text" v-model="newComment" placeholder="Add comment" />
        <button @click="addComment">Add Comment</button>
      </div>

      <div class="comments-section">
        <h3>Comments:</h3>
        <ul>
          <li v-for="(comment, index) in productComments" :key="index">{{ comment }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const appContext = getCurrentInstance();
const loading = ref(true);
const product = ref(null);
const router = useRouter();
const newComment = ref('');
const productId = ref(null);

const fetchProductDetails = async () => {
  try {
    productId.value = router.currentRoute.value.params.id;
    const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`);
    const data = await response.json();
    product.value = data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching product details:', error);
    loading.value = false;
  }
};

onMounted(fetchProductDetails);

watch(
  () => router.currentRoute.value.params.id,
  () => {
    loading.value = true;
    fetchProductDetails();
  }
);

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

const addComment = () => {
  if (newComment.value.trim() !== '') {
    const storedComments = localStorage.getItem(`productComments_${productId.value}`) || '[]';
    const comments = JSON.parse(storedComments);
    comments.push(newComment.value);
    localStorage.setItem(`productComments_${productId.value}`, JSON.stringify(comments));
    newComment.value = '';
    productComments.value = comments;
  }
};

const productComments = ref([]);
onMounted(() => {
  const storedComments = localStorage.getItem(`productComments_${productId.value}`);
  if (storedComments) {
    productComments.value = JSON.parse(storedComments);
  }
});
</script>

<style>
/* dodaj style */
.comment-section {
  margin-top: 20px;
}

.comment-section input[type="text"] {
  margin-right: 10px;
  padding: 5px;
}

.comment-section button {
  padding: 5px 10px;
}

.comments-section {
  margin-top: 20px;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
}

.comments-section li {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
