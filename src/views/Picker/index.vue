<template>
  <div id="picker">
    <sun-picker :columns="columns" />
  </div>
</template>

<script>
export default {
  name: "Picker",
  data() {
    return {
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  }
};
</script>

<style scoped lang="scss">

</style>
