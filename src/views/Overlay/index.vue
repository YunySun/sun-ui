<template>
  <div id="overlay">
    <button @click="show = true">显示遮罩层</button>
    <sun-overlay :show="show" @click="show = false">
      <div style="width: 100px; height: 100px; background-color: #ffffff" />
    </sun-overlay>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped lang="scss">

    #overlay {
        height: 3000px;
    }

</style>
