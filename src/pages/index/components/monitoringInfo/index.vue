<template>
  <pageLayout :is-fix-container="false" :containerStyle="containerStyle">
    <div class="monitoring-box">
      <div class="page-container-left">
        <titleComponent :styles="{ backgroundImage: `url(${monitorLargeBg})` }">
          <div class="title-info">监控信息</div>
        </titleComponent>
        <template v-if="cameraConfigList?.length && showVideos">
          <div class="switch-monitor-gird">
            <!--设备切换TAB-->
            <div class="device-tab-box">
              <div class="device-tab-list">
                <div class="scroll-icon left" @click="scrollBtnHandler('left')"></div>
                <div class="device-box" ref="deviceListRef">
                  <div
                    v-for="(item, index) in cameraConfigList"
                    :key="item.id"
                    class="device-tab-item"
                    :class="{ active: index === currentVideoIndex }"
                    @click.stop="changeCurrentVideo(index)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="scroll-icon right" @click="scrollBtnHandler('right')"></div>
              </div>
            </div>
            <!--监控-->
            <LivePlayer
              class="live-player-container"
              controls
              :key="cameraConfigList[currentVideoIndex].key"
              :url="cameraConfigList[currentVideoIndex].url"
            />
          </div>
        </template>
        <template v-else>
          <empty class="empty" />
        </template>
      </div>
    </div>
  </pageLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import pageLayout from '@/pages/index/components/pageLayout/index.vue'
import titleComponent from '@/pages/index/components/titleComponent/index.vue'
import empty from '@/pages/index/components/empty/index.vue'
import LivePlayer from '@/pages/index/components/LivePlayer/index.vue'
import { getShipMonitorConfig } from '@/pages/index/api/monitor.js'
import { px2vh } from '@/pages/index/assets/js/sizeUtils.js'
import monitorLargeBg from '@/pages/index/assets/images/monitor_title_bg.png'

defineOptions({ name: 'MonitoringInfo' })

const cameraConfigList = ref([]) // 摄像机配置列表
const deviceListRef = ref(null)
const showVideos = ref(true)
const currentVideoIndex = ref(0)

// const src = ref('rtsp://admin:djys2024@192.168.2.254:554/Streaming/Channels/101')

const containerStyle = computed(() => {
  return {
    marginTop: px2vh(126)
  }
})

/**
 * @function scrollBtnHandler
 * @description 滚动按钮处理
 * @param {string} type 滚动类型
 **/
let left = 0
const scrollBtnHandler = (type) => {
  const scrollWidth = deviceListRef.value.scrollWidth // 获取总宽度
  const clientWidth = deviceListRef.value.clientWidth // 获取可视区域宽度
  const scrollLeft = deviceListRef.value.scrollLeft // 当前滚动位置

  let scrollToLeft = scrollLeft // 初始化为当前滚动位置

  if (type === 'right') {
    // 向右滚动
    if (scrollLeft < scrollWidth - clientWidth) {
      left += 100 // 更新 left
      scrollToLeft = Math.min(left, scrollWidth - clientWidth) // 确保不超出最大滚动范围
    }
  } else if (type === 'left') {
    // 向左滚动
    if (scrollLeft > 0) {
      left -= 100 // 更新 left
      scrollToLeft = Math.max(left, 0) // 确保不小于 0
    }
  }

  if (deviceListRef.value) {
    deviceListRef.value.scrollTo({
      left: scrollToLeft,
      behavior: 'smooth'
    })
    console.log(left)
  }
}

/**
 * @function changeCurrentVideo
 * @description 获取当前船舶的摄像机布局配置
 * @param {number} index 当前选中的视频索引
 **/
const changeCurrentVideo = (index) => {
  currentVideoIndex.value = index
}

/**
 * @function getCameraConfigList
 * @description 获取摄像机配置列表
 **/
const getCameraConfigList = async () => {
  const cameraConfigListRes = await getShipMonitorConfig()
  console.log('监控摄像机配置', cameraConfigListRes)
  // const configList = JSON.parse('[{"id":13,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"5","serialNumber":"FH1501930","areaCode":"1","areaCodeTxt":"机舱","name":"主机右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":14,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"6","serialNumber":"FH1501930","areaCode":"1","areaCodeTxt":"机舱","name":"辅机右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":1,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"1","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"辅机左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/1.hd.live"},{"id":3,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"3","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"集控室","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/3.hd.live"},{"id":5,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"5","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"主机左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/5.hd.live"},{"id":9,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"1","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"右舷向后","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":11,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"3","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"LNG右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":12,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"4","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"甲板右向前","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":2,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"2","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"LNG左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/2.hd.live"},{"id":4,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"4","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"左舷后视","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/4.hd.live"},{"id":6,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"6","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"LNG主","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/6.hd.live"},{"id":7,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"7","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"甲板左向前","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/7.hd.live"},{"id":10,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"2","serialNumber":"FH1501930","areaCode":"3","areaCodeTxt":"驾驶室","name":"驾驶室","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":15,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"7","serialNumber":"FH1501930","areaCode":"3","areaCodeTxt":"驾驶室","name":"球机","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":8,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"8","serialNumber":"FR8131769","areaCode":"3","areaCodeTxt":"驾驶室","name":"球机","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/8.hd.live"}]')
  const configList = cameraConfigListRes.data
  cameraConfigList.value = configList.map((item, index) => {
    return {
      ...item,
      // 'https://mister-ben.github.io/videojs-flvjs/bbb.flv'
      url: item.address,
      key: `live-video-${index}-${item.name}`,
      ref: null
    }
  })
}

onMounted(() => {
  getCameraConfigList()
})
</script>

<style scoped lang="scss">
.monitoring-box {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .top-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(48);
    margin-top: vh(15);

    .top-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: vh(44);
      margin: 0 vw(11);
      text-align: center;
      color: rgba(221, 240, 246, 1);
      letter-spacing: vw(2);
      background-image: url('../../assets/images/device_top_component_title.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .net-state-box-position {
        position: absolute;
        left: vw(24);
        top: 50%;
        transform: translateY(-50%);
      }

      .top-title_title {
        font-family: YouSheBiaoTiHei;
        font-size: vh(24);
        letter-spacing: vw(2);
      }

      .update-time {
        position: absolute;
        left: vw(138);
        top: 50%;
        transform: translateY(-50%);
        font-size: vh(16);
        color: rgba(221, 240, 246, 1);
      }
    }

    .back-btn {
      .back-icon {
        width: vw(20);
        height: vw(20);
        margin-right: vw(8);
      }
    }
  }

  .empty {
    height: 100%;
  }

  .page-container-left {
    position: relative;
    width: 100%;
    height: vh(830);
    margin-top: vh(20);

    .title-info {
      margin-left: vw(50);
      font-weight: 600;
      font-size: vh(20);
      color: rgba(221, 240, 246, 1);
      line-height: vh(28);
      letter-spacing: 1px;
    }

    .switch-monitor-gird {
      position: relative;
      width: 100%;
      height: vh(778);
      margin: vh(12) auto 0;

      .device-tab-box {
        box-sizing: border-box;
        width: 100%;
        height: vh(68);
        background: linear-gradient(90deg, #002158 0%, rgba(0, 33, 88, 0) 100%);
        border: 1px solid;
        border-image: linear-gradient(
            9deg,
            rgba(0, 252, 238, 0.69),
            rgba(0, 252, 238, 0.51),
            rgba(3, 18, 44, 0)
        ) 1 1;

        .device-tab-list {
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          height: vh(68);
          background-image: url('../../assets/images/monitor_device_tab_bg.png');
          background-size: calc(100% - vw(21)) vh(16);
          background-repeat: no-repeat;
          background-position: left vw(19) bottom vh(20);

          .scroll-icon {
            cursor: pointer;
            width: vw(17);
            height: vh(12);
            margin-top: vh(23);
            margin-left: vw(24);
            background-image: url('../../assets/images/scroll_more_icon.png');
            background-size: 100% 100%;

            &.left {
              transform: rotate(180deg);
            }
          }

          .device-box {
            overflow: auto;
            width: vw(800);
            height: vh(30);
            margin-top: vh(19);
            margin-left: vw(29);
            white-space: nowrap;

            &::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
            }

            .device-tab-item {
              display: inline-block;
              position: relative;
              cursor: pointer;
              height: vh(29);
              margin-right: vw(24);
              font-weight: 500;
              font-size: vh(16);
              line-height: 1;
              color: rgba(0, 252, 238, 0.4);
              letter-spacing: 1px;

              &.active {
                color: rgba(0, 252, 238, 1);
                text-shadow: 0 0 0 rgba(0, 252, 238, 1);

                &::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: vh(35);
                  height: vw(2);
                  background-color: rgba(0, 252, 238, 1);
                }
              }
            }
          }
        }
      }

      .live-player-container {
        margin: 0 auto;
        height: vh(779);
      }

      .prev-btn,
      .next-btn {
        cursor: pointer;
        z-index: 999;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: vw(50);
        height: vw(50);
        border-radius: 60%;
        background-size: 60%;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .prev-btn {
        left: vw(20);
        background-image: url('../../assets/images/icon_prev_btn.png');
      }

      .next-btn {
        right: vw(20);
        background-image: url('../../assets/images/icon_next_btn.png');
      }

      .device-list {
        z-index: 9999;
        position: absolute;
        top: vh(60);
        left: vw(20);
        background-color: rgba(11, 28, 83, 0.5);
        padding: vh(10) vw(15);
        border-radius: vw(4);

        .switch-box {
          overflow-y: auto;
          height: vh(700);
        }

        .hide {
          height: 0;
          overflow: hidden;
        }

        .device-list-item {
          padding: vh(10) vw(15);
          border-radius: vw(50);
          text-align: center;
          background-color: rgba(1, 121, 182, 0.5);
          margin-bottom: vh(10);
          cursor: pointer;

          &.active {
            background: rgba(99, 242, 255, 1);
          }

          &:hover {
            opacity: 0.8;
          }
        }

        .collapse-item {
          padding: vh(5) 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .sort-btn {
      position: absolute;
      top: vh(33);
      right: vw(200);
    }

    .tab-box {
      position: absolute;
      top: vh(33);
      right: vw(20);
    }

    .page-container-left_title {
      margin-left: vw(35);
      height: vh(44);
      line-height: vh(44);
      font-size: vh(20);
    }

    .monitoring-list-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: vh(40) vw(20);
      height: vw(755);

      .monitoring-item {
        width: vw(570);
        height: vh(400);
        margin-bottom: vh(20);

        &:nth-child(odd) {
          margin-right: vw(20);
        }

        .monitor-box {
          overflow: hidden;
          background-color: rgba(7, 32, 92, 1);
          width: vw(570);
          height: vh(400);

          .video-box {
            overflow: hidden;
            width: 100%;
            height: vh(320);
          }

          .name-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: vh(80);
            font-weight: 500;
            font-size: vh(34);
            color: rgba(102, 255, 255, 1);
            background-color: rgb(7, 32, 92);
            cursor: pointer;
          }
        }
      }
    }
  }

  .page-container-right {
    display: flex;
    flex-direction: column;
    width: vw(456);
    margin-top: vh(13);
    margin-left: vw(24);

    .page-container-right_top {
      .alarm-list-box {
        box-sizing: border-box;
        overflow-y: auto;
        height: vh(434);
        margin-top: vh(10);
        padding: vh(16) vw(12) 0;
        background-image: url('../../assets/images/alarm_info_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;

        .more-btn-box {
          cursor: pointer;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: vh(20);
          margin-bottom: vh(12);
          font-weight: 400;
          font-size: vh(16);
          color: rgba(221, 240, 246, 1);
          line-height: 22px;
          text-align: left;
          font-style: normal;
        }

        .alarm-item {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          height: vh(116);
          margin-bottom: vh(12);
          background-color: rgba(54, 109, 135, 0.21);
          border-radius: vw(8);

          &:last-child {
            margin-bottom: 0;
          }

          .alarm-item-icon {
            width: vh(106);
            height: vh(92);
            margin-right: vw(16);
            margin-left: vw(12);
            border-radius: vw(8);
          }

          .info-box {
            flex: 1;
            margin-right: vw(15);

            .info-name {
              margin-bottom: vh(4);
              font-weight: 500;
              font-size: vh(16);
              line-height: vh(20);
              color: rgba(221, 240, 246, 1);
            }

            .info-desc {
              margin-bottom: vh(4);
              font-weight: 400;
              font-size: vh(14);
              line-height: vh(20);
              color: rgba(221, 240, 246, 0.4);
            }

            :last-child {
              margin-bottom: 0;
            }
          }

          .btn-box {
            position: absolute;
            top: vh(12);
            right: vw(12);
            align-self: flex-start;

            .alarm-tag {
              display: flex;
              justify-content: center;
              align-items: center;
              height: vh(24);
              line-height: vh(24);
              padding: 0 vw(6);
              font-weight: 400;
              font-size: vh(14);
              border-radius: vw(4);
              color: rgba(221, 240, 246, 1);
              background-color: rgba(255, 77, 79, 1);
            }
          }
        }
      }
    }

    .page-container-right_bottom {
      margin-top: vh(24);

      .line-chart-box {
        width: 100%;
        height: vh(275);
        margin-top: vh(10);
        background-image: url('../../assets/images/alarm_count_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  .single-empty {
    height: 100%;
    margin: vh(250) auto;
  }
}
</style>
