<template>
  <div>
    <h6>Test Application</h6>
    <p>This Application is for test purpose for {{ companyName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const companyName = ref('Soft Square') // TODO: get from config

</script>

<style scoped>

</style>