<template>
  <input class="input" type="text" :placeholder="placeholder" />
</template>
<script setup>
import { onMounted, ref } from 'vue'

const placeholder = ref('')

const { collectionType } = defineProps(['collectionType'])

onMounted(() => {
  if (collectionType === 'tv') {
    placeholder.value = `Search any TV Show/Series...`
  } else {
    placeholder.value = `Search any Movie...`
  }
})
</script>
<style lang=""></style>
