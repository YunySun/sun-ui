<template>
  <transition name="sun-fade">
    <div
      v-show="show"
      class="sun-overlay"
      :class="className"
      :style="style"
      @click="hideAction"
      @touchmove="hideAction"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { addClass, removeClass } from "../utils/index";
import _extends from "../utils/extends";
export default {
  name: "SunOverlay",
  props: {
    show: {
      type: Boolean
    },
    zIndex: {
      type: Number | String
    },
    className: {
      type: String
    },
    customStyle: {
      type: Object
    },
    duration: {
      type: Number | String
    }
  },
  data() {
    return {
      style: {}
    };
  },
  watch: {
    show(value) {
      if (value) {
        addClass(document.getElementsByTagName("body")[0], "sun-overflow-hidden");
      } else {
        removeClass(document.getElementsByTagName("body")[0], "sun-overflow-hidden");
      }
    },
    zIndex(value) {
      this.style["zIndex"] = value;
    },
    customStyle(value) {
      this.style = _extends(this.style, value);
    },
    duration(value) {
      this.style["animationDuration"] = value + "s";
    }
  },
  mounted() {
    // console.log(this.show);
    this.style = this.customStyle || {};
    this.zIndex && (this.style["zIndex"] = this.zIndex);
    this.duration && (this.style["animationDuration"] = this.duration + "s");
  },
  methods: {
    hideAction() {
      // e.preventDefault();
      // e.stopPropagation();
      this.$emit("click");
    }
  }
};
</script>

<style scoped>

    .sun-overlay {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
    }

</style>
