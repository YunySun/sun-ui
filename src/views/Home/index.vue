<template>
    <div>
        <router-link :to="{path: '/'}">首页</router-link>
        <router-link :to="{path: '/popover'}">弹出框</router-link>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>