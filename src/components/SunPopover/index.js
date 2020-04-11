import sunPopover from './sunPopover'

const SunPopover={
    install: function (Vue) {
        Vue.component(sunPopover.name, sunPopover)
    }
};

export default SunPopover;