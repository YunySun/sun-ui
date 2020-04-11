<template>
    <transition name="sun-fade">
        <div class="sun-overlay"
             :class="className"
             v-show="show"
             @click="hideAction"
             @touchmove="hideAction"
             :style="style"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    import {addClass, removeClass} from '../utils/index'
    export default {
        name: "sunOverlay",
        data() {
            return {
                style: {}
            }
        },
        watch: {
            show(value) {
                if (value) {
                    addClass(document.getElementsByTagName('body')[0], 'sun-overflow-hidden')
                } else {
                    removeClass(document.getElementsByTagName('body')[0], 'sun-overflow-hidden');
                }
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false,
            },
            zIndex: {
                type: Number|String,
            },
            className: {
                type: String
            },
            customStyle: {
                type: Object
            },
            duration: {
                type: Number|String
            }
        },
        created() {
            console.log(this.show)
            this.style = this.customStyle || {};
            this.zIndex && (this.style['zIndex']=this.zIndex);
            this.duration && (this.style['animationDuration']=this.duration+'s');
        },
        methods: {
            hideAction(e) {
                // e.preventDefault();
                // e.stopPropagation();
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>

    .sun-overlay {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
    }

    .sun-overlay .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

</style>