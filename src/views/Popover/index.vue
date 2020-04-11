<template>
    <div class="popover">
        <sun-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="bottom"
                      @show="showAction"
                      @hide="hideAction"
        >
            <button slot="reference">点击事件</button>
        </sun-popover>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <sun-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="top"
                      trigger="focus"
        >
            <button slot="reference">点击事件</button>
        </sun-popover>
        <br>
        <sun-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="right"
                      trigger="hover"
        >
            <button slot="reference">点击事件</button>
        </sun-popover>
        <span>test test test test test test test test test test test test test test test test test test test test test</span>

        <sun-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="left"
                      trigger="focus"
        >
            <div slot="reference" style="margin-left: 300px">
                <input type="text" placeholder="这是一个输入框">
            </div>
        </sun-popover>
    </div>
</template>

<script>
    export default {
        name: "popover",
        methods: {
            showAction() {
                console.log('show')
            },
            hideAction() {
                console.log('hide')
            }
        }
    }
</script>

<style scoped>

</style>