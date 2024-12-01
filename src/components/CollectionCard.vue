<template>
  <div class="card" :class="{ 'is-skeleton': isLoading }" @click="goToCastView">
    <div class="card-image">
      <figure class="image">
        <img :src="imgUrl" alt="Poster image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ trimmedTitle }}
        <br />
        <p>
          {{ collectionType === 'movie' ? collection.release_date : collection.first_air_date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const imgUrl = ref('')

const { isLoading, collection, collectionType } = defineProps([
  'collection',
  'collectionType',
  'isLoading',
])

const trimmedTitle = computed(() => {
  let splittedArray = []
  if (collectionType === 'movie') {
    splittedArray = collection.title.split('').filter((el) => el === ' ')
    if (splittedArray.length >= 2) {
      return collection.title.slice(0, 25)
    } else {
      return collection.title
    }
  } else {
    splittedArray = collection.name.split('').filter((el) => el === ' ')
    if (splittedArray.length >= 2) {
      return collection.name.slice(0, 25)
    } else {
      return collection.name
    }
  }
})
const goToCastView = () => {
  if (collectionType === 'movie') {
    router.push({
      name: 'movie-casts',
      params: { id: collection.id },
      query: {
        collectionType: collectionType,
        collectionName: collection.title,
        year: collection.release_date.substring(0, 4),
      },
    })
  } else if (collectionType === 'tv') {
    router.push({
      name: 'tv-casts',
      params: { id: collection.id },
      query: {
        collectionType: collectionType,
        collectionName: collection.name,
        year: collection.first_air_date.substring(0, 4),
      },
    })
  }
}

onMounted(() => {
  if (collection.poster_path) {
    imgUrl.value = `https://image.tmdb.org/t/p/original/${collection.poster_path}`
  } else imgUrl.value = '../../src/assets/movie.jpg'
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }
}

img {
  width: 100%;
  height: 320px;
  object-fit: cover;
}

.card-content {
  width: 100%;
  min-height: 20px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 15px;
}

p {
  font-size: 12px;
  font-weight: normal;
}
</style>
