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
      
      <!-- Pole do dodawania komentarzy -->
      <div class="comment-section">
        <input type="text" v-model="newComment" placeholder="Add comment" />
        <button @click="addComment">Add Comment</button>
      </div>

      <!-- Wyświetlanie komentarzy z localStorage -->
      <div class="comments-section">
        <h3>Comments:</h3>
        <ul>
          <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref(true);
const product = ref(null);
const router = useRouter();
const cartItems = ref([]);
const comments = ref([]); // Tablica na komentarze
const newComment = ref(''); // Nowy komentarz

const fetchProductDetails = async () => {
  try {
    const productId = router.currentRoute.value.params.id;
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
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
  cartItems.value.push(product);
};

// Funkcja dodająca komentarz do tablicy i do localStorage
const addComment = () => {
  if (newComment.value.trim() !== '') {
    comments.value.push(newComment.value);
    localStorage.setItem('productComments', JSON.stringify(comments.value)); // Zapisz w localStorage
    newComment.value = ''; // Wyczyść pole po dodaniu komentarza
  }
};

// Pobieranie komentarzy z localStorage po załadowaniu komponentu
onMounted(() => {
  const storedComments = localStorage.getItem('productComments');
  if (storedComments) {
    comments.value = JSON.parse(storedComments);
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
