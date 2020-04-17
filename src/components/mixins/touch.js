import Vue from "vue";

export var TouchMixin = Vue.extend({
  methods: {
    touchStart(event) {
      this.resetTouchStatus();
      var touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
    },
    resetTouchStatus() {
      this.startX = 0;
      this.startY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
    }
  }
});
