<script setup>
  import todo from './view/Client.vue'
</script>

<template>
  <Suspense> 
    <template #default>
    <div><todo/></div>
    </template>
    <template #fallback> loading</template>
  </Suspense>
</template>

<style>
</style>
