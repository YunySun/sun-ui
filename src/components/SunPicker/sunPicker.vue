<template>
  <div class="sun-picker">
    <div class="sun-picker-columns" :style="{height: '220px', overflow: 'hidden'}">
      <sun-picker-column :initial-options="columns" />
      <div class="sun-picker__mask" />
      <div class="sun-hairline-unset--top-bottom sun-picker__frame" />
    </div>
  </div>
</template>

<script>
import SunPickerColumn from "./sunPickerColumn";
export default {
  name: "SunPicker",
  components: { SunPickerColumn },
  props: {
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">

  .sun-picker-columns {
    position: relative;
    display: flex;
  }

</style>
