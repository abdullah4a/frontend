<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

// Register layouts as components
const layouts = {
  DefaultLayout,
}

// Determine which layout to use based on route meta or name
const layout = computed(() => {
  const layoutName = route?.meta?.layout || 'DefaultLayout'
  return layouts[layoutName as keyof typeof layouts]
})
</script>
