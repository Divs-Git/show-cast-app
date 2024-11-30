<template>
  <div class="entertainment-selector">
    <h1 class="title has-text-centered">Choose Your Entertainment</h1>
    <div class="columns is-centered">
      <div class="column is-5">
        <div class="card tv-shows" @click="selectOption('TV Shows')">
          <div class="card-content">
            <p class="subtitle has-text-centered">TV Shows</p>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <div class="card movies" @click="selectOption('Movies')">
          <div class="card-content">
            <p class="subtitle has-text-centered">Movies</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntertainmentSelector',
  methods: {
    selectOption(option) {
      console.log(option) // Handle the option selection (navigate or fetch data)
    },
  },
}
</script>

<style lang="scss" scoped>
.entertainment-selector {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  .title {
    font-size: 3rem;
    margin-bottom: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  }

  .columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
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
    }

    .subtitle {
      font-size: 1.8rem;
      color: #fff;
    }
  }
}
</style>
