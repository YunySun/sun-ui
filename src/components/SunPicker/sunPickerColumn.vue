<template>
  <div class="sun-picker-column" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @transitionend="onTransitionEnd">
    <ul class="van-picker-column__wrapper" :style="{transform: 'translate3D(0, ' + (baseOffset+offset)+'px' + ', 0)', transitionDuration: duration+'ms'}">
      <li
        v-for="(item, index) in initialOptions"
        :key="index"
        :style="{height: itemHeight + 'px'}"
        class="sun-ellipsis van-picker-column__item"
        @click="onClickItem(index)"
      >{{ item[valueKey]|| item }}</li>
    </ul>
  </div>
</template>
<script>
import { range } from "../utils/number";
import { TouchMixin } from "../mixins/touch";
var MOMENTUM_DURATION = 200;
var MOMENTUM_LIMITED_TIME = 300;
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
    },
    defaultIndex: {
      default: 0,
      type: Number | String
    },
    valueKey: {
      type: String
    },
    itemHeight: {
      type: String | Number
    },
    visibleItemCount: {
      type: String | Number
    },
    swipeDuration: {
      type: String | Number
    }
  },
  data() {
    return {
      offset: 0,
      duration: 0,
      currentIndex: this.defaultIndex,
      options: JSON.parse(JSON.stringify(this.initialOptions))
    };
  },
  computed: {
    baseOffset() {
      return (this.visibleItemCount - 1) / 2 * this.itemHeight;
    },
    count() {
      return this.options.length;
    }
  },
  watch: {
    defaultIndex(value) {
      this.setIndex(value);
    },
    initialOptions(value) {
      if (JSON.stringify(value) !== JSON.stringify(this.options)) {
        this.options = JSON.parse(JSON.stringify(value));
        this.setIndex(this.defaultIndex);
      }
    }
  },
  created() {
    // console.log(this.defaultIndex);
    // if (this.defaultIndex) {
    //   this.setIndex(this.defaultIndex);
    // }
    if (this.$parent.children) {
      this.$parent.children.push(this);
    }
    this.currentIndex && this.setIndex(this.currentIndex);
  },
  methods: {
    onTouchStart(event) {
      this.touchStart(event);
      this.startOffsetY = this.offset;

      this.transitionEndTrigger = null;
      this.touchStartTime = new Date();
      this.momentumOffset = this.startOffsetY;
    },
    onTouchMove(event) {
      this.touchMove(event);
      event.preventDefault();
      event.stopPropagation();
      this.moving = true;
      this.offset = range(this.startOffsetY + this.deltaY, -(this.count * this.itemHeight), this.itemHeight);

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

      this.duration = MOMENTUM_DURATION;
      // console.log(this.duration);
      var index = this.getIndexByOffset(this.offset);
      this.setIndex(index, true);
      // this.setIndex()
      var _this = this;
      setTimeout(function() {
        _this.moving = false;
      }, 0);
    },
    onTransitionEnd() {
      this.stopMomentum();
    },
    onClickItem(index) {
      this.duration = MOMENTUM_DURATION;
      this.setIndex(index, true);
    },
    getIndexByOffset(offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    setIndex(index, changeEmitStatus) {
      // console.log(index);
      var offset = -index * 44;

      var _this = this;
      var trigger = function trigger() {
        if (_this.currentIndex !== index) {
          _this.currentIndex = index;

          if (changeEmitStatus) {
            _this.$emit("change", index);
          }
        }
      };

      if (this.moving && offset !== this.offset) {
        this.transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      this.offset = offset;
    },
    momentumAction(distance, duration) {
      var speed = distance / duration;
      distance = this.offset + speed / 0.003;
      this.duration = this.swipeDuration;
      var index = this.getIndexByOffset(distance);
      this.setIndex(index, true);
    },
    stopMomentum() {
      this.moving = false;
      this.duration = 0;

      if (this.transitionEndTrigger) {
        this.transitionEndTrigger();
        this.transitionEndTrigger = null;
      }
    },
    getValue() {
      return this.initialOptions[this.currentIndex];
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
        text-align: center;
      }
    }
  }

</style>
