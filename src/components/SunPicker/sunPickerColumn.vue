<template>
  <div class="sun-picker-column" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @transitionend="onTransitionEnd">
    <ul class="van-picker-column__wrapper" :style="{transform: 'translate3D(0, ' + (baseOffset+offset)+'px' + ', 0)', transitionDuration: duration+'ms'}">
      <li
        v-for="(item, index) in initialOptions"
        :key="index"
        class="sun-ellipsis van-picker-column__item"
        @click="onClickItem(index)"
      >{{ item }}</li>
    </ul>
  </div>
</template>
<script>
import { range } from "../utils/number";
import { TouchMixin } from "../mixins/touch";
var MOMENTUM_LIMITED_TIME = 200;
var MOMENTUM_LIMITED_DISTANCE = 15;

export default {
  name: "SunPickerColumn",
  mixins: [TouchMixin],
  props: {
    initialOptions: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data() {
    return {
      offset: 0,
      baseOffset: 88,
      duration: 0
    };
  },
  methods: {
    onTouchStart(event) {
      this.touchStart(event);
      this.startOffsetY = this.offset;

      this.touchStartTime = new Date();
      this.momentumOffset = this.startOffsetY;
    },
    onTouchMove(event) {
      this.touchMove(event);
      event.preventDefault();
      event.stopPropagation();
      this.offset = range(this.startOffsetY + this.deltaY, -220, 44);

      var now = new Date();
      if (now - this.touchStartTime > MOMENTUM_LIMITED_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd(event) {
      var duration = new Date() - this.touchStartTime;
      var distance = this.offset - this.momentumOffset;
      // console.log(distance);
      var allowMomentum = (duration < MOMENTUM_LIMITED_TIME) && (Math.abs(distance) > MOMENTUM_LIMITED_DISTANCE);
      if (allowMomentum) {
        this.momentumAction(distance, duration);
        return;
      }

      this.duration = 200;
      // console.log(this.duration);
      var index = this.getIndexByOffset(this.offset);
      this.setIndex(index);
      // this.setIndex()
    },
    onTransitionEnd() {
      this.duration = 0;
    },
    onClickItem(index) {
      this.duration = 200;
      this.setIndex(index);
    },
    getIndexByOffset(offset) {
      return range(Math.round(-offset / 44), 0, 4);
    },
    setIndex(index) {
      this.offset = -index * 44;
    },
    momentumAction(distance, duration) {
      var speed = distance / duration;
      distance = this.offset + speed / 0.003;
      this.duration = 1000;
      var index = this.getIndexByOffset(distance);
      this.setIndex(index);
    }
  }
};
</script>

<style scoped lang="scss">

  .sun-picker-column {
    flex: 1;
    overflow: hidden;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        height: 44px;
        line-height: 44px;
        text-align: center;
      }
    }
  }

</style>
