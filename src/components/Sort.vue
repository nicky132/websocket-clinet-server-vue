<script setup>
   import useTodo from "../composables/useTodo";
   const {orderBy} = useTodo();
   const order = ()=>{
       orderBy.value = orderBy.value == 'asc' ? 'desc':'asc'
   }
</script>
<template>
  <button @click="order">{{orderBy=='asc'?'升序':'降序'}}</button>
</template>
<style lang="scss" scoped>
    button{
        margin: 10px;
    }
</style>