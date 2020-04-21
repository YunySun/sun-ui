<template>
  <div>
    <ul>
      <li v-for="(item, index) in pages" :key="index">
        <router-link :to="{path: item.path}">{{ item.title }}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      pages: [
        {
          path: "/",
          title: "首页"
        },
        {
          path: "/popover",
          title: "气泡弹出框"
        },
        {
          path: "/picker",
          title: "选择器"
        },
        {
          path: "/overlay",
          title: "遮罩层"
        },
        {
          path: "/popup",
          title: "弹出层"
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
