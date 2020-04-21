<template>
  <div class="sun-picker">
    <div v-if="(!toolbarPosition || toolbarPosition === 'top') && !$slots.default" class="sun-picker__toolbar sun-hairline--top-bottom">
      <button class="sun-picker__cancel" @click="$emit('cancel')">{{ cancelButtonText }}</button>
      <span v-if="!$slots.title" class="sun-picker__title">{{ title }}</span>
      <slot name="title" />
      <button class="sun-picker__confirm" @click="$emit('confirm')">{{ confirmButtonText }}</button>
    </div>
    <slot name="columns-top" />
    <div
      class="sun-picker-columns"
      :style="{height: visibleItemCount * itemHeight + 'px', overflow: 'hidden', lineHeight: itemHeight + 'px'}"
    >
      <sun-picker-column
        v-for="(item, index) in formattedColumns"
        :key="index"
        :initial-options="item.values"
        :default-index="item.defaultIndex"
        :value-key="valueKey"
        :item-height="itemHeight"
        :visible-item-count="visibleItemCount"
        :swipe-duration="swipeDuration"
        @change="onChange"
      />
      <slot />
      <div class="sun-picker__mask" :style="{backgroundSize: '100% ' + (visibleItemCount - 1) / 2 * itemHeight + 'px'}" />
      <div class="sun-hairline-unset--top-bottom sun-picker__frame" :style="{height: itemHeight + 'px'}" />
    </div>
    <slot name="columns-bottom" />
    <div v-if="(!toolbarPosition || toolbarPosition === 'bottom') && !$slots.default" class="sun-picker__toolbar sun-hairline--top-bottom">
      <button class="sun-picker__cancel" @click="emit('cancel')">{{ cancelButtonText }}</button>
      <span v-if="!$slots.title" class="sun-picker__title">{{ title }}</span>
      <slot name="title" />
      <button class="sun-picker__confirm" @click="emit('confirm')">{{ confirmButtonText }}</button>
    </div>
  </div>
</template>

<script>
import SunPickerColumn from "./sunPickerColumn";
import { indexDiff } from "../utils/number";
export default {
  name: "SunPicker",
  components: { SunPickerColumn },
  props: {
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Number | String,
      default: 0
    },
    showToolbar: {
      type: Boolean
    },
    title: {
      type: String
    },
    toolbarPosition: {
      type: String
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    valueKey: {
      type: String,
      default: "text"
    },
    itemHeight: {
      type: Number | String,
      default: 44
    },
    visibleItemCount: {
      type: Number | String
    },
    swipeDuration: {
      default: 1000,
      type: String | Number
    }
  },
  data() {
    return {
      children: [],
      formattedColumns: [],
      cascadeSelect: []
    };
  },
  computed: {
    dataType() {
      var columns = this.columns;
      var firstColumn = columns[0];
      if (firstColumn.children) {
        return "cascade";
      } else if (firstColumn.values) {
        return "object";
      }
      return "text";
    }
  },
  watch: {
    columns: {
      handler: "format",
      immediate: true
    }
  },
  methods: {
    getCascadeIndexs() {
      return this.children.map(function(child) {
        return child.currentIndex;
      });
    },
    getObjValues() {
      return this.children.map(function(child) {
        return child.getValue();
      });
    },
    onChange(index) {
      // eslint-disable-next-line no-empty
      if (this.dataType === "cascade") {
        this.onCascadeChange(index);
      } else {
        this.$emit("change", this, this.getObjValues(), index);
      }
    },
    emit(event) {
      this.$emit(event, this.getObjValues(), this.getCascadeIndexs());
    },
    format() {
      switch (this.dataType) {
        case "text":
          this.formattedColumns = [{ values: this.columns, defaultIndex: this.defaultIndex }];
          break;
        case "cascade":
          this.formatCascadeColumns();
          break;
        default:
          this.formattedColumns = this.columns;
      }
    },
    formatCascadeColumns() {
      var _this = this;
      var formatted = [];
      var selectIndex = [];
      var cascadeData = { children: this.columns };
      while (cascadeData && cascadeData.children) {
        var defaultIndex = cascadeData.defaultIndex || this.defaultIndex;
        formatted.push({
          values: cascadeData.children.map(function(child) {
            return child[_this.valueKey];
          }),
          defaultIndex
        });
        selectIndex.push(defaultIndex);
        cascadeData = cascadeData.children[defaultIndex];
      }

      this.formattedColumns = formatted;
      this.cascadeSelect = selectIndex;
    },
    onCascadeChange(index) {
      var _this = this;
      var cascadeIndexs = this.getCascadeIndexs();
      var diffIndex = indexDiff(cascadeIndexs, this.cascadeSelect);
      // console.log(diffIndex, index);
      var cascadeFormate = [];
      var cascadeData = { children: this.columns };
      for (var i = 0, len = this.formattedColumns.length; i < len; i++) {
        var defaultIndex = ((diffIndex >= i) ? cascadeIndexs[i] : (cascadeData.defaultIndex || this.defaultIndex));
        cascadeIndexs[i] = defaultIndex;
        if (i < diffIndex) {
          cascadeFormate.push(this.formattedColumns[i]);
        } else {
          cascadeFormate.push({
            values: cascadeData.children.map(function(child) {
              return child[_this.valueKey];
            }),
            defaultIndex
          });
        }
        cascadeData = cascadeData.children[defaultIndex];
        // console.log(cascadeFormate, cascadeData);
      }
      this.formattedColumns = cascadeFormate;
      this.cascadeSelect = cascadeIndexs;
      this.$emit("change", this, this.getObjValues(), index);
    }
  }
};
</script>

<style scoped lang="scss">

  .sun-picker-columns {
    position: relative;
    display: flex;
  }

  .sun-picker__toolbar {
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    line-height: 44px;
  }

  .sun-picker__title {
    font-weight: 500;
    font-size: 16px;
  }

  .sun-picker__cancel, .sun-picker__confirm {
    padding: 0 16px;
    color: cornflowerblue;
    font-size: 14px;
    border: none;
    background-color: transparent;
    outline: none;
  }

  .sun-picker__mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: -webkit-linear-gradient(top, rgba(255,255,255,.9), rgba(255,255,255,.4)), -webkit-linear-gradient(bottom, rgba(255,255,255,.9), rgba(255,255,255,.4));
    background-image: linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.4)), linear-gradient(0deg, rgba(255,255,255,.9), rgba(255,255,255,.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    pointer-events: none;
  }

  .sun-picker__frame {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 3;
    width: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    pointer-events: none;
  }

</style>
