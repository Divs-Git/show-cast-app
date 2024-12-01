<template>
  <div class="collection-container">
    <div class="hero-container">
      <slot name="hero"></slot>
    </div>
    <div class="cards">
      <slot
        name="card"
        v-for="item in entries"
        :key="item.id"
        :item="item"
        :isLoading="isLoading"
      />
    </div>
    <div class="pagination" v-if="!isCastPage">
      <button class="button is-rounded is-light" @click="goToPreviousPage">Back</button>
      <div class="box">{{ currentPage }}</div>
      <button class="button is-rounded is-light" @click="goToNextPage">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['endpoint', 'headers', 'isCastPage'])

const currentPage = ref(1)
const entries = ref([])
const isLoading = ref(false)

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  } else {
    currentPage.value = 1
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToNextPage = () => {
  currentPage.value++
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const fetchData = async () => {
  try {
    isLoading.value = true
    let url = ''
    if (props.isCastPage) {
      url = `${props.endpoint}`
      const res = await axios.get(url, {
        headers: props.headers,
      })
      entries.value = res.data.cast
    } else {
      url = `${props.endpoint}&page=${currentPage.value}`
      const res = await axios.get(url, {
        headers: props.headers,
      })
      entries.value = res.data.results
    }
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    isLoading.value = false
  }
}
watch(currentPage, fetchData)
onMounted(fetchData)
</script>

<style lang="scss" scoped>
.collection-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 16px; // Add padding for smaller screens
}

.hero-container {
  height: 200px;
  padding-top: 20px;
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
