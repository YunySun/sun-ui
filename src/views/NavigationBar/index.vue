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
  created() {
    var a = `{"joinCollTopicType":true,"reCode":"0","reInfo":"成功!","tempTieziInfo":{"anonymous":false,"can_del":"1","can_zan":"0","changtuwenTopic":false,"coll_link_url":"https://kyapptest.log56.com/nsqserver/shq/topics/topics_detail_coll.html?t_id=1220068&topicsType=2&ftype=0","coll_tag_full_name":"#集合贴#","coll_tag_name":"集合贴","coll_topics_id":"1220068","comment_count":"0","content":"<kyat class=\'kyat\' userid=\'YUhwQlFUaE5jQ3RKUVRnOQ==\'>@瑞昌周庆勇</kyat> 摸摸我我我我我我","detail_url":"https://kyapptest.log56.com/nsqserver/shq/topics/topics_detail_common.html?t_id=1222067&topicsType=0&ftype=0","essence":false,"essenceTopic":false,"guangaoTopic":false,"hide":false,"homeTop":false,"hot":false,"hotTopic":true,"huodongTopic":false,"is_anonymous":"1","is_essence":"1","is_hide":"1","is_home_top":"1","is_locked":"1","is_tag_top":"1","is_topics_hot":"1","jiheTopic":false,"join_count":"0","join_user_count":"0","localTopic":true,"locked":false,"newComerViewTopic":false,"normalTopic":true,"official":false,"officialBigEventTopic":false,"officialJinqiTopic":false,"pKTopic":false,"postFailed":false,"postStatus":"1","postSuccess":false,"posting":true,"release_time":"刚刚","resource_type":"1","share_count":"0","showTagNameLabel":false,"sosFiveViewTopic":false,"sosSubItemNotEmpty":false,"sos_coll_topics_id":"","t_id":"1222067","tag":{},"tagId":"","tagTop":false,"top":false,"topics_type":0,"topics_type_name":"动态贴","touPiaoTopic":false,"urlTopic":false,"user":{"head_img_url":"https://test-live-ol-cdn.log56.com/nsq/header/20191128/2fb6f862-aeb2-4b0f-afb2-93c14b0075d3.jpg","identity_level_localImgName":"guanliyuan","identity_level_local_img_resid":2131624177,"nick_name":"风丶King","specialManager":false,"user_id":"TmxoWk5XSk5ObU5QUWxrOQ=="},"videoTopic":false,"zanNextOpt":"0","zan_count":"0"},"type":"5"}`

    console.log(JSON.parse(a))
  }
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
