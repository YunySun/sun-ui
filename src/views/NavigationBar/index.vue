<template>
  <div class="lee__navigationbar">
    <nav>
      <div class="nav__wrapper">
        <div class="nav__item" v-for="(item, index) in data">
          <div class="nav__title">{{ item.title }}</div>
          <div class="nav__menu">
            <ul>
              <li v-for="(subItem, subIndex) in item.content">
                {{ subItem.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  data() {
    return {
      data: [
        {
          title: "首页",
          content: [
            {
              title: "首页1",
            },
            {
              title: "首页2",
            },
          ],
        },
        {
          title: "面料商城",
          content: [
            {
              title: "面料商城1",
            },
            {
              title: "面料商城2",
            },
          ],
        },
        {
          title: "创意中心",
          content: [
            {
              title: "创意中心1",
            },
            {
              title: "创意中心2",
            },
          ],
        },
        {
          title: "时尚杂志",
          content: [
            {
              title: "时尚杂志1",
            },
            {
              title: "时尚杂志2",
            },
          ],
        },
        {
          title: "时尚图库",
          content: [
            {
              title: "时尚图库1",
            },
            {
              title: "时尚图库2",
            },
          ],
        },
        {
          title: "生产基地",
          content: [
            {
              title: "生产基地1",
            },
            {
              title: "生产基地2",
            },
          ],
        },
        {
          title: "合作品牌",
          content: [
            {
              title: "合作品牌1",
            },
            {
              title: "合作品牌2",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.test {
  height: 600px;
  background-color: green;
}
.lee__navigationbar {
    position: relative;
  nav {
    padding: 0 60px;
    max-width: 1240px;
    margin: 0 auto;
    .nav__wrapper {
      display: flex;
      justify-content: space-between;

      .nav__item {
        flex: 1;
        margin: 0 30px;
        text-align: center;

        .nav__title {
        }

        &:hover {
          .nav__menu {
            height: 120px;
            z-index: 11;
          }
        }

        .nav__menu {
          position: absolute;
          z-index: 10;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 0;
          transition: all 0.5s;
          background-color: rgba(255,255,255,.7);

          ul {
            max-width: 1240px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>
