<template>
    <div class="popover">
        <yuny-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="bottom"
                      @show="showAction"
                      @hide="hideAction"
        >
            <button slot="reference">点击事件</button>
        </yuny-popover>

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
        <yuny-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="top"
                      trigger="focus"
        >
            <button slot="reference">点击事件</button>
        </yuny-popover>
        <br>
        <yuny-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="right"
                      trigger="hover"
        >
            <button slot="reference">点击事件</button>
        </yuny-popover>
        <span>test test test test test test test test test test test test test test test test test test test test test</span>

        <yuny-popover title="标题"
                      content="这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题"
                      width="200px"
                      direction="left"
                      trigger="focus"
        >
            <div slot="reference" style="margin-left: 300px">
                <input type="text" placeholder="这是一个输入框">
            </div>
        </yuny-popover>
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