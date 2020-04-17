import _extends from "./extends";
import Vue from "vue";

export function mount(Component, data) {
  var instance = new Vue({
    el: document.createElement("div"),
    props: Component.props,
    render: function render(h) {
      return h(Component, _extends({
        props: this.$props
      }, data));
    }
  });
  document.body.appendChild(instance.$el);
  return instance;
}
