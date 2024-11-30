<template>
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
</template>
<script setup>
import CollectionCard from '@/components/CollectionCard.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

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
  console.log(route)
  fetchCollections()
})
</script>
<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 36px;
  margin: 0 auto;
  max-width: 1600px;
}

.pagination {
  margin-top: 30px;
  justify-content: center;
  gap: 30px;
}

.box {
  margin-bottom: 0;
}
</style>
