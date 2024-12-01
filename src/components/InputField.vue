<template>
  <div class="search-container" ref="searchContainer">
    <div class="field">
      <div class="control has-icons-left">
        <input
          v-model="query"
          @input="debouncedGetSuggestions"
          type="text"
          class="input"
          placeholder="Search movies or TV shows"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>

    <div v-if="suggestions.length" class="suggestions-dropdown box">
      <ul>
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item"
        >
          <div class="media">
            <div class="media-left">
              <figure class="image is-32x32">
                <img :src="getPosterUrl(suggestion)" alt="Poster" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">{{ suggestion.title || suggestion.name }}</p>
              <p class="subtitle is-7">
                {{ suggestion.release_date || suggestion.first_air_date }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const suggestions = ref([])
let debounceTimeout = null

const searchContainer = ref(null)

const closeSuggestions = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    suggestions.value = []
  }
}

onMounted(() => {
  document.addEventListener('click', closeSuggestions)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeSuggestions)
})

const getSuggestions = async () => {
  if (query.value.trim() === '') {
    suggestions.value = []
    return
  }

  try {
    const url = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query.value}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    }
    const res = await axios.get(url, options)
    suggestions.value = res.data.results
  } catch (error) {
    console.error('Error fetching suggestions:', error)
  }
}

const debouncedGetSuggestions = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  debounceTimeout = setTimeout(() => {
    getSuggestions()
  }, 500)
}

const selectSuggestion = (suggestion) => {
  if (suggestion.media_type === 'movie') {
    router.push({
      name: 'movie-casts',
      params: { id: suggestion.id },
      query: {
        collectionType: suggestion.media_type,
        collectionName: suggestion.title,
        year: suggestion.release_date.substring(0, 4),
      },
      key: suggestion.id,
    })
  } else if (suggestion.media_type === 'tv') {
    router.push({
      name: 'tv-casts',
      params: { id: suggestion.id },
      query: {
        collectionType: suggestion.media_type,
        collectionName: suggestion.name,
        year: suggestion.first_air_date.substring(0, 4),
      },
      key: suggestion.id,
    })
  }
}

const getPosterUrl = (suggestion) => {
  return suggestion.poster_path
    ? `https://image.tmdb.org/t/p/original/${suggestion.poster_path}`
    : '../../src/assets/movie.jpg'
}
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px; /* Rounded corners for the dropdown */
  padding-right: 8px; /* Add space on the right for the scrollbar */
}

/* Webkit Browsers (Chrome, Safari, Edge) */
.suggestions-dropdown::-webkit-scrollbar {
  width: 8px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* Track background */
  border-radius: 10px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background-color: #888; /* Thumb color */
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Thumb color on hover */
}

.suggestion-item {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background-color: #3e3d3d;
  }
}

.media-left .image img {
  width: 32px;
  height: 32px;
}
</style>
