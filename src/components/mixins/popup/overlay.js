import Overlay from "../../SunOverlay/sunOverlay";
import { mount } from "../../utils/functional";
import { context } from "./context";
import _extends from "../../utils/extends";
var defaultConfig = {
  className: "",
  customStyle: {}
};

var overlay;

function onClickOverlay() {
  if (context.top) {
    var vm = context.top.vm;
    vm.$emit("click-overlay");
    if (vm.closeOnClickOverlay) {
      vm.close();
      // if (vm.onClickOverlay) {
      //   vm.onClickOverlay();
      // }
    }
  }
}

function mountOverlay() {
  overlay = mount(Overlay, {
    on: {
      click: onClickOverlay
    }
  });
}

export function updateOverlay() {
  if (!overlay) {
    mountOverlay();
  }

  if (context.top) {
    var _ctxTop = context.top;
    var vm = _ctxTop.vm;
    var config = _ctxTop.config;
    var el = vm.$el;
    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    } else {
      document.body.appendChild(overlay.$el);
    }

    _extends(overlay, defaultConfig, config, {
      show: true
    });
  } else {
    overlay.show = false;
  }
}

export function openOverlay(vm, config) {
  if (!context.stack.some(function(item) {
    return item.vm === vm;
  })) {
    context.stack.push({
      vm,
      config
    });
    updateOverlay();
  }
}

export function closeOverlay(vm) {
  var stack = context.stack;
  if (stack.length) {
    if (context.top.vm === vm) {
      context.stack.pop();
      updateOverlay();
    } else {
      context.stack = stack.filter(function(item) {
        return item.vm !== vm;
      });
    }
  }
}
