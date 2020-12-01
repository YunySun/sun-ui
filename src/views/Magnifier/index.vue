<template>
  <div class="magnifier">
    <div
      class="magnifier-wrapper"
      ref="magnRef"
      @mouseenter="mouseEnterAction"
      @mouseleave="mouseLeaveAction"
      @mousemove="mouseMoveAction"
    >
      <img src="../../assets/images/1.jpg" />
      <span
        class="magnifier-shadow"
        v-if="show"
        :style="{ top: top + 'px', left: left + 'px' }"
      ></span>
    </div>
    <div
      class="larger"
      v-if="show"
      :style="{
        top: $refs.magnRef.getBoundingClientRect().top + 'px',
        left:
          $refs.magnRef.getBoundingClientRect().left +
          $refs.magnRef.getBoundingClientRect().width +
          10 +
          'px',
      }"
    >
      <img :style="{ top: -top*3 + 'px', left: -left*3 + 'px' }" src="../../assets/images/1.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "magnifier",
  data() {
    return {
      show: false,
      top: 0,
      left: 0,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    mouseEnterAction(event) {
      console.log(event);
      console.log(this.$refs.magnRef.getBoundingClientRect().left);
      this.show = true;
      this.startX =
        event.clientX - this.$refs.magnRef.getBoundingClientRect().left;
      this.startY =
        event.clientY - this.$refs.magnRef.getBoundingClientRect().top;
      this.top = this.startY - 100;
      this.left = this.startX - 100;
    },
    mouseMoveAction(event) {
      // console.log(event)

      // console.log(this.$refs.magnRef.getBoundingClientRect())
      this.show = true;
      this.startX =
        event.clientX - this.$refs.magnRef.getBoundingClientRect().left;
      this.startY =
        event.clientY - this.$refs.magnRef.getBoundingClientRect().top;
      this.top = Math.max(0, Math.min(this.startY - 100, 400));
      this.left = Math.max(0, Math.min(this.startX - 100, 400));
    },
    mouseLeaveAction(event) {
      this.show = false;
    },
  },
};
</script>

<style scoped lang="scss">
.magnifier {
  .magnifier-wrapper {
    position: relative;
    overflow: hidden;
    width: 600px;
    height: 600px;
    // cursor:move;
    img {
      width: 100%;
      height: 100%;
    }

    .magnifier-shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background: url("../../assets/images/dot.png");
    }
  }

  .larger {
    position: absolute;
    width: 600px;
    height: 600px;
    overflow: hidden;

    img {
      position: absolute;
      width: 1800px;
      height: 1800px;
    }
  }
}
</style>
