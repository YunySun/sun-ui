<template>
    <div id="overlay">
        <button @click="show = true">显示遮罩层</button>
        <sun-overlay :show="show" @click="show = false">
            <div style="width: 100px; height: 100px; background-color: #ffffff"></div>
        </sun-overlay>
    </div>
</template>

<script>
    export default {
        name: "overlay",
        data() {
            return {
                show: false
            }
        }
    }
</script>

<style scoped lang="scss">

    #overlay {
        height: 3000px;
    }

</style>