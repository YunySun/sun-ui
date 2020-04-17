<template>
  <transition :name="'sun-popup-slide-'+(transition||position)">
    <div
      v-show="value"
      class="sun-popup"
      :class="['sun-popup--'+(position||'center'), {'sun-popup--round': round}]"
      :style="style"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import PopupMixin from "../mixins/popup/index.js";
export default {
  name: "SunPopup",
  mixins: [PopupMixin],
  props: {
    value: {
      default: false,
      type: Boolean,
      required: true
    },
    transition: {
      type: String
    },
    overlay: {
      default: true,
      type: Boolean
    },
    position: {
      type: String
    },
    closeOnClickOverlay: {
      default: true,
      type: Boolean
    },
    round: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number | String
    }
  },
  computed: {
    style() {
      return this.duration ? { transitionDuration: this.duration + "s" } : "";
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
</style>
