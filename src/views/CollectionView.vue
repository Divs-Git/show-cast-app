<template>
  <div class="collection-container">
    <div class="hero-container">
      <AppHero />
    </div>
    <div class="cards">
      <CollectionCard
        v-for="collection in collectionsData.results"
        :key="collection.id"
        :collection="collection"
        :collectionType="collectionType"
      />
    </div>
    <div class="pagination">
      <button
        class="button is-rounded is-light"
        @click="currentPage > 1 ? currentPage-- : (currentPage = 1)"
      >
        Back
      </button>
      <div class="box">
        {{ currentPage }}
      </div>
      <button class="button is-rounded is-light" @click="currentPage++">Next</button>
    </div>
  </div>
</template>
<script setup>
import CollectionCard from '@/components/CollectionCard.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import AppHero from '@/components/AppHero.vue'

const route = useRoute()
const currentPage = ref(1)
const collectionsData = ref([])
const collectionType = route.params.collectionType

const fetchCollections = async () => {
  const url = `https://api.themoviedb.org/3/discover/${collectionType}?include_adult=false&page=${currentPage.value}&sort_by=popularity.desc`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzQxZjg5NjBiNGI1MzI1ZjgzODQ2MWVmMTM2MDEyMiIsIm5iZiI6MTczMjk4MDYxNi43NDMsInN1YiI6IjY3NGIyZjg4YjcyZGU1OTEyM2VlNWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhaxiKinuX47uy8ibwpbIxvTYFvrqar4tP1Tk8fuUyE',
    },
  }

  const res = await axios.get(url, options)
  collectionsData.value = res.data
}

watch(currentPage, () => {
  fetchCollections()
})

onMounted(() => {
  fetchCollections()
})
</script>
<style lang="scss" scoped>
.collection-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 16px; // Add padding for smaller screens
}

.hero-container {
  height: 400px;
  padding-top: 80px;
  margin: 0 auto;
  width: 100%;
  max-width: 1300px; // Limit maximum width for larger screens

  @media (max-width: 768px) {
    padding-top: 40px; // Reduce padding on smaller screens
    height: 300px;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 768px) {
    gap: 16px; // Reduce gap on smaller screens
  }

  @media (max-width: 480px) {
    gap: 12px; // Further reduce gap for very small screens
  }
}

.pagination {
  display: flex; // Add flex for proper alignment
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  gap: 16px; // Adjust gap for responsiveness

  @media (max-width: 768px) {
    gap: 12px;
  }

  .box {
    margin-bottom: 0;
    padding: 8px 16px; // Add padding for better touch targets
    font-size: 16px; // Adjust font size for visibility
  }

  button {
    padding: 8px 16px;
    font-size: 16px;

    @media (max-width: 768px) {
      padding: 6px 12px; // Reduce padding for smaller buttons
      font-size: 14px;
    }
  }
}
</style>
