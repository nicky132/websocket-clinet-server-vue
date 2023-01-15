<script setup>
  import Item from '../components/item.vue'
  import useTodo from '../composables/useTodo';
  import Add from '../components/add.vue'
  import Sort from '../components/Sort.vue'
  const {todos,load} = await useTodo()
  load();
</script>

<template>
  <div class="todos"> 
    <item class="item" v-for="todo of todos" :key="todo.id" :todo='todo'/>
  </div>
  <Add/>
  <Sort/>
</template>

<style lang="scss" scoped>
div.todos{
  color: #fff;
  display: flex;
  flex-direction: column;
  .item{
    margin:0 10px 10px ;
  }
}
</style>
