<script setup>
    import useTodo from '../composables/useTodo'
    import {ref} from 'vue'
    const title = ref('')
    const onSubmit=()=>{
        useTodo().add({title:title.value})
        title.value = ''
    }
</script>
<template>
    <div class="add">
        <input type="text" v-model="title" placeholder="请输入内容回车提交任务"  @keyup.enter="onSubmit" />
    </div> 
</template>

<style lang="scss" scoped>
    div.add{
        display: flex;
        margin: 0 10px;
        input{
            border: solid 5px #9b59b6;
            padding: 10px;
            outline: none;
            flex: 1;
        }
    }
</style>