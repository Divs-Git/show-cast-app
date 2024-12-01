<template>
  <div class="card" @click="goToWiki">
    <div class="card-image">
      <figure class="image">
        <img :src="imgUrl" alt="Cast image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ cast.name }}
        <br />
        <p>
          {{ cast.character }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const { cast } = defineProps(['cast'])
const imgUrl = ref('')

const goToWiki = () => {
  const castWikiUrl = `https://en.wikipedia.org/wiki/${cast.name.replace(/\s+/g, '_')}`
  window.open(castWikiUrl, '_blank')
}

onMounted(() => {
  if (cast.profile_path) {
    imgUrl.value = `https://image.tmdb.org/t/p/original/${cast.profile_path}`
  } else {
    imgUrl.value = '../../src/assets/default-avatar-icon-of-social-media-user-vector.jpg'
  }
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
