<template>
  <div class="collection-selector">
    <div class="search">
      <AppHero />
    </div>
    <h1 class="title has-text-centered">Choose From Collections</h1>
    <div class="columns is-centered">
      <div class="column is-5">
        <div class="card tv-shows" @click="selectOption('tv')">
          <div class="card-content">
            <p class="subtitle has-text-centered">TV Shows</p>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <div class="card movies" @click="selectOption('movie')">
          <div class="card-content">
            <p class="subtitle has-text-centered">Movies</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHero from '@/components/AppHero.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectOption = (collectionType) => {
  router.push({ name: 'collection-view', params: { collectionType } })
}
</script>

<style lang="scss" scoped>
.search {
  z-index: 1000;
  width: 50%;
  height: 150px;
  margin: 0 auto;

  ::v-deep .input-field {
    width: 100%;
  }
}

.collection-selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 16px;

  .title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    @media (max-width: 768px) {
      gap: 1.5rem;
    }
  }

  .card {
    position: relative;
    height: 300px;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
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

    @media (max-width: 768px) {
      width: 400px;
      height: 240px;
    }

    @media (max-width: 480px) {
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }

    &.tv-shows {
      background-image: url('https://m.media-amazon.com/images/S/pv-target-images/b5ab0e5792e602302fe439cb0fd2365980ce21c3cc97d6f345d7a5bb7a2c3fe1.jpg');
    }

    &.movies {
      background-image: url('https://miro.medium.com/v2/1*wjjtVF5kRWPisPIUnEiMPg.jpeg');
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    }

    .card-content {
      position: absolute;
      margin: 0 auto;
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      object-fit: cover;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }

      @media (max-width: 480px) {
        font-size: 1rem;
      }
    }

    .subtitle {
      font-size: 1.8rem;
      color: #fff;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
