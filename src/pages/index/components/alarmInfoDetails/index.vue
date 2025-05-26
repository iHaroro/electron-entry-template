<template>
  <pageLayout v-if="showPage">
    <div class="alarm-info-details">
      <div class="btn back-btn" @click="close">返回</div>
      <div class="alarm-info-box">
        <!--字段-->
        <div class="alarm-info">
          <div
            class="alarm-info-item"
            v-for="item in filedKeys"
            :key="`alarm-info-item-${item.key}`"
            :style="{
              width: `${25 * (item.row || 1)}%`,
            }"
          >
            <p class="alarm-info-title">{{ item.label }}</p>
            <div class="alarm-info-data" :title="item.content">{{ item.content }}</div>
          </div>
        </div>
        <!--图片-->
        <div class="alarm-images">
          <p class="alarm-image-title">报警图片</p>
          <div ref="viewerImg" class="alarm-image-list">
            <template v-if="images?.length">
              <img
                v-for="(item, index) in images"
                class="alarm-image-item"
                :key="`alarm-image-item_${index}`"
                :src="item.src"
                alt=""
                @click="viewImg(index)"
              />
            </template>
            <Empty v-else />
          </div>
        </div>
        <!--视频-->
        <div class="alarm-videos">
          <p class="alarm-video-title">报警图视频</p>
          <div class="alarm-video-list">
            <template v-if="videos?.length">
              <video
                class="alarm-video-item"
                v-for="(item, index) in videos"
                :key="`alarm-video-item_${index}`"
                :src="item.src"
                controls
              />
            </template>
            <Empty v-else />
          </div>
        </div>
        <!--响应按钮-->
        <div class="btn-box">
          <div class="btn btn-1">处理</div>
          <div class="btn btn-2">已读</div>
        </div>
        <!-- 处理流程 -->
        <div class="handle-process-box">
          <p class="handle-process-box_title">处理流程</p>
          <handleProcessLog />
        </div>
      </div>
    </div>
  </pageLayout>
</template>

<script setup>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
import { ref, nextTick } from 'vue'
import handleProcessLog from '@/pages/index/components/handleProcessLog/index.vue'
import pageLayout from '@/pages/index/components/pageLayout/index.vue'
import Empty from '@/pages/index/components/empty/index.vue'
defineOptions({ name: 'AlarmInfoDetails' })

const images = ref([
  {
    src: 'https://dummyimage.com/1600x900',
  },
  {
    src: 'https://dummyimage.com/500x300',
  },
  {
    src: 'https://dummyimage.com/1920x1080',
  },
  {
    src: 'https://dummyimage.com/1366x768',
  },
])
const videos = ref([
  {
    src: 'https://www.runoob.com/try/demo_source/movie.mp4',
  },
  {
    src: 'https://www.runoob.com/try/demo_source/movie.mp4',
  },
  {
    src: 'https://www.runoob.com/try/demo_source/movie.mp4',
  },
])

const filedKeys = ref([
  {
    label: '报警船舶',
    key: 'alarmShip',
    content: '11111',
  },
  {
    label: '报警区域',
    key: 'alarmArea',
    content: '11111',
  },
  {
    label: '报警设备',
    key: 'alarmDevice',
    content: '11111',
  },
  {
    label: '报警地点',
    key: 'alarmSpot',
    content: '11111',
  },
  {
    label: '报警级别',
    key: 'alarmLevel',
    content: '11111',
  },
  {
    label: '处理人',
    key: 'alarmHandler',
    content: '11111',
  },
  {
    label: '处理状态',
    key: 'handleState',
    content: '11111',
  },
  {
    label: '处理内容',
    key: 'handleContent',
    content: '11111',
  },
  {
    label: '报警时间',
    key: 'alarmTime',
    content: '11111',
  },
  {
    label: '报警内容',
    key: 'alarmContent',
    content: '11111111111111111111111111111111111111111111',
    row: '2',
  },
])

const viewerImg = ref(null)
let viewer = null

/**
 * @function viewImg
 * @description 查看图片
 * @param {number} index 图片下标
 **/
const viewImg = (index) => {
  viewer.show(index)
}

const initViewer = () => {
  viewer = new Viewer(viewerImg.value)
}

const showPage = ref(false)
const open = () => {
  // GET DATA
  // ...
  showPage.value = true

  nextTick(() => {
    initViewer()
  })
}

const close = () => {
  showPage.value = false
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>
.alarm-info-details {
  background-image: url('../../assets/images/alarm_info_detail_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: top center;

  .back-btn {
    position: absolute;
    right: vw(15);
    top: vh(-35);
  }

  .alarm-info-box {
    overflow-y: auto;
    position: absolute;
    top: vh(85);
    right: vw(30);
    bottom: vh(25);
    left: vw(30);
    background: linear-gradient(180deg, rgba(52, 88, 155, 0.27) 0%, rgba(48, 97, 219, 0.29) 100%);

    .alarm-info {
      display: flex;
      flex-wrap: wrap;
      width: vw(1200);
      padding: vh(32) vw(50) 0;

      .alarm-info-item {
        box-sizing: border-box;
        width: 25%;
        margin-bottom: vh(18);

        &:nth-child(4n) {
          margin-right: 0;
        }

        .alarm-info-data {
          $top: 16;
          $right: 60;
          $bottom: 16;
          $left: 16;
          box-sizing: border-box;
          //width: 100%;
          min-height: vh(18);
          margin-right: vw(108);
          margin-bottom: vh(9);
          font-weight: 500;
          font-size: vh(16);
          color: rgba(255, 255, 255, 0.85);
          border-top: vh($top) solid #000;
          border-right: vw($right) solid #000;
          border-bottom: vh($bottom) solid #000;
          border-left: vw($left) solid #000;
          border-image-source: url('../../assets/images/alarm_detail_info_item_bg.png');
          border-image-slice: $top $right $bottom $left;
          border-image-width: vh($top) vw($right) vh($bottom) vw($left);
          border-image-outset: vh(0) vw(0) vh(0) vw(0);
          border-image-repeat: repeat;
        }

        .alarm-info-title {
          margin-bottom: vh(9);
          font-weight: 500;
          font-size: vh(18);
          color: #ffffff;
        }
      }
    }

    .alarm-images {
      padding: 0 vw(50);

      .alarm-image-title {
        margin-bottom: vh(20);
        font-weight: 500;
        font-size: vh(18);
        color: #ffffff;
      }

      .alarm-image-list {
        display: flex;
        flex-wrap: wrap;

        .alarm-image-item {
          width: vh(112);
          height: vh(112);
          margin-right: vw(20);
          cursor: pointer;
          border-radius: vh(8);
        }
      }
    }

    .alarm-videos {
      padding: vh(18) vw(50) 0;

      .alarm-video-title {
        margin-bottom: vh(20);
        font-weight: 500;
        font-size: vh(18);
        color: #ffffff;
      }

      .alarm-video-list {
        display: flex;
        flex-wrap: wrap;

        .alarm-video-item {
          width: vw(181);
          height: vh(123);
          margin-right: vw(20);
          background: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          border-radius: vh(8);
        }
      }
    }

    .btn-box {
      padding: vh(18) 0 vh(20);
      margin: 0 vw(50);
      border-bottom: 1px solid rgba(238, 238, 238, 0.2);

      .btn-1 {
        margin-right: vw(20);
        background: rgba(255, 151, 70, 1);
      }

      .btn-2 {
        background: rgba(0, 114, 255, 1);
      }
    }

    .handle-process-box {
      padding: vh(18) 0 vh(20);
      margin: 0 vw(50);

      &_title {
        font-weight: 500;
        font-size: vh(18);
        color: #ffffff;
        margin-bottom: vh(28);
      }
    }
  }
}
</style>
