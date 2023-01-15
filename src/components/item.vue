<script setup>
    import useRequest from '../composables/useRequest';
    import useTodo from '../composables/useTodo';
    const {del} = useTodo();
    const request = useRequest();
    const {todo} = defineProps({
        todo:{type:Object,required:true}
    })
</script>
<template>
    <div class="todo">
        <input :value='todo.title'/>
        <button @click="del(todo.id)">删除</button>
    </div>
</template>
<style lang="scss" scoped>
    div.todo{
        display: flex;
        input{
            padding:10px;
            outline: none;
            border: solid 2px red;
            flex:1;
        }
    } 
</style>