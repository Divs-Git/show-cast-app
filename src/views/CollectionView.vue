<template>
  <ViewBase
    :endpoint="`https://api.themoviedb.org/3/discover/${collectionType}?include_adult=false&sort_by=popularity.desc`"
    :headers="headers"
    :isCastPage="false"
  >
    <template #hero>
      <AppHero :collectionType="collectionType" type="collection" />
    </template>
    <template #card="{ item, isLoading }">
      <CollectionCard :collection="item" :collectionType="collectionType" :isLoading="isLoading" />
    </template>
  </ViewBase>
</template>

<script setup>
import ViewBase from '@/components/ViewBase.vue'
import AppHero from '@/components/AppHero.vue'
import CollectionCard from '@/components/CollectionCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const collectionType = route.params.collectionType

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
}
</script>
