<!-- CastCollectionView.vue -->
<template>
  <ViewBase
    :endpoint="`https://api.themoviedb.org/3/${type}/${id}/credits`"
    :headers="headers"
    :isCastPage="true"
  >
    <template #hero>
      <AppHero subTitle="Cast Members" type="cast" :name="`${name} (${year})`" />
    </template>
    <template #card="{ item }">
      <CastCard :cast="item" />
    </template>
  </ViewBase>
</template>

<script setup>
import ViewBase from '@/components/ViewBase.vue'
import AppHero from '@/components/AppHero.vue'
import CastCard from '@/components/CastCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const type = route.query.collectionType
const name = route.query.collectionName
const year = route.query.year

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY} `,
}
</script>
