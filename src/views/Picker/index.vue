<template>
  <div id="picker">
    <sun-picker
      :columns="columns"
      show-toolbar
      title="标题"
      toolbar-position="bottom"
      :visible-item-count="5"
      :swipe-duration="1000"
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
export default {
  name: "Picker",
  data() {
    return {
      // columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
      // columns: [
      //   {
      //     values: ["周一", "周二", "周三", "周四", "周五"],
      //     defaultIndex: 2
      //   },
      //   {
      //     values: ["上午", "下午", "晚上"],
      //     defaultIndex: 1
      //   }
      // ]
      columns: [
        {
          text: "浙江",
          children: [
            {
              text: "杭州",
              children: [{ text: "西湖区" }, { text: "余杭区" }]
            },
            {
              text: "温州",
              children: [{ text: "鹿城区" }, { text: "瓯海区" }]
            }
          ]
        },
        {
          text: "福建",
          children: [
            {
              text: "福州",
              children: [{ text: "鼓楼区" }, { text: "台江区" }]
            },
            {
              text: "厦门",
              children: [{ text: "思明区" }, { text: "海沧区" }]
            }
          ]
        }
      ]
    };
  },
  methods: {
    onChange(picker, value, index) {
      alert(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel(value, index) {
      alert(`当前值：${value}, 当前索引：${index}`);
    },
    onConfirm(value, index) {
      alert(`当前值：${value}, 当前索引：${index}`);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
