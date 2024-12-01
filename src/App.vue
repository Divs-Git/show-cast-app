<template>
  <header>
    <div class="HeaderTitle" @click="goToMain">
      <img src="../src/assets/play.png" alt="" width="60px" />
      <h1 class="title is-2">SHOW CASTS</h1>
    </div>
  </header>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}
</script>

<style lang="scss">
main {
  padding-bottom: 80px;
}
header {
  padding: 10px 30px;
}
.HeaderTitle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

header h1 {
  font-weight: bolder;
}
</style>
