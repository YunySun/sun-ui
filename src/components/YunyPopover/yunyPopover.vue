<template>
    <span>
        <transition :name="transition"
                    @after-enter="handleAfterEnter"
                    @after-leave="handleAfterLeave">
        >
            <div class="yuny-popover"
                 :class="'yuny-popover-'+direction"
                 :style="{width, top: top + 'px', left: left + 'px'}"
                 ref="popover"
                 v-show="!disabled && showPopover"
            >
                <div class="yuny-popover__title" v-text="title"></div>
                <slot>{{ content }}</slot>
                <div ref="arrow" class="yuny__arrow"
                     :class="'yuny-arrow-'+direction"
                     :style="{left: arrowLeft + 'px', top: arrowTop + 'px'}">
                </div>
            </div>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>

<script>
    import {on, off} from '../utils'
    
    export default {
        name: "YunyPopover",
        data() {
            return {
                top: 'unset',
                left: 'unset',
                arrowLeft: 'unset',
                arrowTop: 'unset',
                showPopover: false
            }
        },
        props: {
            trigger: {
                type: String,
                default: 'click',
                validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
            },
            title: String,
            content: String,
            width: {},
            direction: {
                type: String,
                default: 'bottom'
            },
            disabled: Boolean,
            transition: {
                type: String,
                default: 'fade-in-linear'
            }
        },
        mounted() {
            let reference = this.referenceElm =this.$refs.reference;
            if (!reference && this.$slots.reference && this.$slots.reference[0]) {
                reference = this.referenceElm = this.$slots.reference[0].elm;
            }
            let popover = this.$refs.popover;

            // 是否有控制标签
            if (reference) {
                // 判断行为
                switch (this.trigger) {
                    case 'click':
                        on(reference, 'click', this.doToggle);
                        on(document, 'click', this.handleDocumentClick);
                        break;
                    case 'hover':
                        on(reference, 'mouseenter', this.doShow);
                        on(popover, 'mouseenter', this.doShow);
                        on(reference, 'mouseleave', this.doClose);
                        on(popover, 'mouseleave', this.doClose);
                        break;
                    case 'focus':
                        if(reference.querySelector('input, textarea')) {
                            on(reference, 'focusin', this.doShow);
                            on(reference, 'focusout', this.doClose);
                        } else {
                            on(reference, 'mousedown', this.doShow);
                            on(reference, 'mouseup', this.doClose);
                            on(document, 'mousedown', this.handleDocumentClick);
                        }
                        break;
                    default:
                        on(reference, 'click', this.doToggle);
                        on(document, 'click', this.handleDocumentClick);
                }
            }

        },
        methods: {
            // 动画播放完毕后触发
            handleAfterEnter() {
                this.$emit('after-enter')
            },
            // 隐藏播放完毕后触发
            handleAfterLeave() {
                this.$emit('after-leave')
            },
            // 显示
            doShow() {
                this.$emit('show');
                this.showPopover = true;
                this.setPosition();
            },
            // 隐藏
            doClose() {
                this.$emit('hide');
                this.showPopover = false;
            },
            // 设置document点击事件
            handleDocumentClick(e) {
                const reference = this.referenceElm;
                const popover = this.$refs.popover;
                if (!this.$el||!reference||this.$el.contains(e.target)||reference.contains(e.target)||!popover||popover.contains(e.target))return;
                this.doClose();
            },
            // 切换
            doToggle() {
                this.showPopover = !this.showPopover;
                this.showPopover ? this.doShow() : this.doClose();
            },
            // 设置弹出框位置
            setPosition() {
                if (this.$refs.popover.getBoundingClientRect().width > 0) return;
                this.$nextTick(() => {
                    let referenceRect = this.referenceElm.getBoundingClientRect();
                    let popoverRect = this.$refs.popover.getBoundingClientRect();
                    let arrowRect = this.$refs.arrow.getBoundingClientRect();
                    if((this.direction === 'bottom') || (this.direction === 'top')) {
                        this.left = (referenceRect.left + (referenceRect.width - popoverRect.width) / 2);
                        let maxLeft = document.documentElement.clientWidth - popoverRect.width;
                        this.left = Math.min(maxLeft, Math.max(this.left, 0));
                        this.arrowLeft = (referenceRect.left - this.left +(referenceRect.width - arrowRect.width)/2);
                    } else {
                        this.top = ((referenceRect.height - popoverRect.height) / 2 + referenceRect.top);
                    }
                    (this.direction === 'bottom') && (this.top = (referenceRect.top + referenceRect.height));
                    (this.direction === 'top') && (this.top = (referenceRect.top - popoverRect.height));
                    (this.direction === 'right') && (this.left = (referenceRect.left + referenceRect.width));
                    (this.direction === 'left') && (this.left = (referenceRect.left-popoverRect.width));
                })
            }
        },
        destroyed() {
            const reference = this.referenceElm;
            const popover = this.$refs.poppover;

            off(reference, 'click', this.doToggle);
            off(document, 'click', this.handleDocumentClick);
            off(reference, 'mouseenter', this.doShow);
            off(popover, 'mouseenter', this.doShow);
            off(reference, 'mouseleave', this.doClose);
            off(popover, 'mouseleave', this.doClose);
        },
    }
</script>

<style scoped>

    .yuny-popover {
        position: absolute;
        z-index: 999;
        padding: 20px;
        color: #666;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        line-height: 1.4;
        font-size: 14px;
        background-color: #fff;
    }

    .yuny-popover-top {
        margin-top: -10px;
    }

    .yuny-popover-bottom {
        margin-top: 10px;
    }

    .yuny-popover-left {
        margin-left: -10px;
    }

    .yuny-popover-right {
        margin-left: 10px;
    }

    .yuny-popover__title {
        color: #333;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .yuny__arrow {
        position: absolute;
        top: -6px;
        margin-left: -3px;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        border-top-width: 0;
        border-bottom-color: #e5e5e5;
    }

    .yuny-arrow-top {
        top: unset;
        bottom: -6px;
        transform: rotate(180deg);
    }

    .yuny-arrow-left, .yuny-arrow-right {
        top: 50%;
        margin-top: -3px;
    }

    .yuny-arrow-right {
        left: 0;
        transform: rotate(-90deg);
        margin-left: -9px;
    }

    .yuny-arrow-left {
        right: -9px;
        transform: rotate(90deg);
    }

    .yuny__arrow:after {
        content: '';
        position: absolute;
        top: 1px;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        border-top-width: 0;
        border-bottom-color: #fff;
        margin-left: -6px;
    }

</style>