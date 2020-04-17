import sunOverlay from "./sunOverlay";

const SunOverlay = {
  install: function(Vue) {
    Vue.component(sunOverlay.name, sunOverlay);
  }
};

export default SunOverlay;
