import { openOverlay, closeOverlay } from "./overlay";
import { context } from "./context";

export default {
  props: {
    overlayClass: {
      type: String
    },
    overlayStyle: {
      type: Object
    }
  },
  mounted() {
    if (this.value) {
      this.open();
    }
  },
  watch: {
    value(val) {
      val ? this.open() : this.close();
    }
  },
  methods: {
    open() {
      this.renderOverlay();
      // console.log(context);
    },
    close() {
      closeOverlay(this);
      this.$emit("input", false);
    },
    renderOverlay() {
      var _this = this;

      this.$nextTick(() => {
        _this.updateZIndex(_this.overlay ? 1 : 0);
        if (this.overlay) {
          openOverlay(_this, {
            zIndex: context.zIndex++,
            duration: _this.duration,
            className: _this.overlayClass,
            customStyle: _this.overlayStyle
          });
        } else {
          closeOverlay(_this);
        }
      });
    },
    updateZIndex(ascend) {
      this.$el.style.zIndex = ++context.zIndex + ascend;
    }
  }
};
