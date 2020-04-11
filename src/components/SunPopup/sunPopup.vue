<template>
    <div>123</div>
</template>

<script>
    import Vue from 'vue'
    import sunOverlay from '../SunOverlay/sunOverlay'
    export default {
        name: "sunPopup",
        data() {
            return {
                show: true
            }
        },
        created() {
            // console.log(this.$parent)
            // console.log(Vue.extend())
        },
        mounted() {
            // var Overlay = Vue.extend({
            //     template: '<sun-overlay :show="show" @click="show = false"></sun-overlay>',
            //     data: function () {
            //         return {
            //             show: this.show
            //         }
            //     }
            // });
            //
            var overlay = new Vue({
                el: document.createElement('div'),
                render: function render(h) {
                    return h(sunOverlay, {
                        props: {
                            show: true,
                        },
                        on: {
                            click: () => {

                            }
                        }
                    })
                }
            });
            console.log(overlay);
            console.log(this.$el.parentNode)
            console.log(overlay.$el)
            this.$el.parentNode.insertBefore(overlay.$el, this.$el);
            // document.body.appendChild(overlay.$el);
            // var overlay = new Overlay().$mount();
            // console.log(this.$el.parentNode)
            // this.$el.parentNode.appendChild(overlay)
        }
    }
</script>

<style scoped>

</style>