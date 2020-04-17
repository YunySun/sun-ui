import sunPopup from "./sunPopup";

const SunPopup = {
  install: function(Vue) {
    Vue.component(sunPopup.name, sunPopup);
  }
};

export default SunPopup;
