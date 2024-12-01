<template>
  <header>
    <div class="title">
      <img src="../src/assets/play.png" alt="" width="60px" />
      <h1 class="title is-2">SHOW CASTS</h1>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>
<script setup></script>

<style lang="scss">
main {
  min-height: 100vh;
  min-width: 100vw;
  padding-bottom: 100px;
}
header {
  padding: 10px 30px;
}
.title {
  display: flex;
  align-items: center;
  gap: 10px;
}

header h1 {
  font-weight: bolder;
}
</style>
