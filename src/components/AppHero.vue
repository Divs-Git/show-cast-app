<template>
  <div class="input-field">
    <InputField :collectionType="collectionType" />
  </div>
  <div class="hero">
    <h1 class="title is-1">{{ title }}</h1>
    <h2 class="subtitle">{{ subTitle }}</h2>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import InputField from './InputField.vue'

const props = defineProps(['type', 'collectionType', 'name', 'subTitle'])
const title = ref('')

onMounted(() => {
  if (props.type === 'collection') {
    if (props.collectionType === 'movie') {
      title.value = 'Movies'
    } else {
      title.value = 'TV-Shows / Series'
    }
  } else if (props.type === 'cast') {
    title.value = props.name
  }
})
</script>
<style lang="scss" scoped>
.hero {
  text-align: center; // Ensure text is centered on smaller screens

  @media (max-width: 768px) {
    margin: 60px auto; // Reduce margin for smaller screens
  }

  @media (max-width: 480px) {
    margin: 40px auto; // Further reduce margin for very small screens
  }
}

.input-field {
  width: 30%;
  margin-bottom: 20px; // Add spacing below the input field

  @media (max-width: 768px) {
    width: 50%; // Adjust width for tablets and smaller devices
  }

  @media (max-width: 480px) {
    width: 80%; // Adjust width for phones
  }
}

.title {
  font-size: 2.5rem; // Scale font size for better readability
  @media (max-width: 768px) {
    font-size: 2rem; // Adjust font size for smaller screens
  }

  @media (max-width: 480px) {
    font-size: 1.75rem; // Further adjust font size for very small screens
  }
}

.subtitle {
  font-size: 1.25rem; // Scale font size
  @media (max-width: 768px) {
    font-size: 1rem; // Adjust for tablets
  }

  @media (max-width: 480px) {
    font-size: 0.875rem; // Adjust for phones
  }
}
</style>
