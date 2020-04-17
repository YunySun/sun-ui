<template>
  <div id="popup">
    <!--          <van-popup v-model="show">内容</van-popup>-->
    <button @click="show = true">展示弹出窗</button>
    <sun-popup
      v-model="show"
      position="bottom"
      round
      :style="{height: '30%', width: '100%'}"
      @click-overlay="hideAction"
    >
      内容
    </sun-popup>
  </div>
</template>

<script>
export default {
  name: "Popup",
  data() {
    return {
      show: false
    };
  },
  methods: {
    hideAction() {
      this.show = false;
    }
  }
};
</script>

<style scoped>

</style>

