import Vue from 'vue';
import sunOverlay from '../../SunPopup/sunPopup'

export var PopupMixin = {
    mounted() {
        var Overlay = Vue.extend({
            template: '<sun-overlay :show="show" @click="show = false"></sun-overlay>',
            data: function () {
                return {
                    show: this.show
                }
            }
        });

        var overlay = new Overlay().$mount();
        this.$el.parentNode.appendChild(overlay)
    }
};