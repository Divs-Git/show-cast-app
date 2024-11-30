<template>
  <div class="main-container">
    <h1 class="title">Choose Your Entertainment</h1>
    <div class="options-container">
      <div class="option tv-shows">
        <h2>TV Shows</h2>
      </div>
      <div class="option movies">
        <h2>Movies</h2>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #1f1c2c, #928dab);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-container {
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.options-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.option {
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.option h2 {
  font-size: 1.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.tv-shows {
  background: linear-gradient(to top right, #ff8c00, #ffbf00);
}

.movies {
  background: linear-gradient(to top right, #e94e77, #d681a3);
}

.option:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>
