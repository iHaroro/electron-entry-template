<template>
  <div class="page-content">
    <BreadcrumbItems />

    <div class="page-view-content">
      <div class="page-view-item">
        <div class="page-view-title">查看</div>
        <div class="page-view-form">
          <div class="page-view-form-detail">
            <div class="form-detail-item">
              <div class="form-detail-item-label">报警区域</div>
              <div class="form-detail-item-value">驾驶室</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">告警类型</div>
              <div class="form-detail-item-value">疲劳驾驶</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">风险等级</div>
              <div class="form-detail-item-value">高</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">告警时间</div>
              <div class="form-detail-item-value">2025-01-02 15:23:234</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">处理状态</div>
              <div class="form-detail-item-value">已纠正</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">坐标</div>
              <div class="form-detail-item-value">118°21′E、31°20N</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">航速</div>
              <div class="form-detail-item-value">10.9kn</div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">处理状态</div>
              <div class="form-detail-item-value">已处理</div>
            </div>
          </div>
          <div class="page-view-form-detail">
            <div class="form-detail-item">
              <div class="form-detail-item-label">告警图片</div>
              <div class="form-detail-item-img">
                <a-image src="https://hwfile.miniclouds.cn:20777/file/down/202505-58fdd044614b49209ae5107b598b4b95.jpg" />
              </div>
            </div>
            <div class="form-detail-item">
              <div class="form-detail-item-label">告警视频</div>
              <div class="form-detail-item-img">
                <LivePlayer
                  class="detail-form-video"
                  url="https://media.w3.org/2010/05/sintel/trailer.mp4"
                  :autoplay="false"
                  controls
                  hide-snapshot-button
                  hide-stretch-button
                  hide-big-play-button
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-view-item">
        <div class="page-view-title">处理流程</div>
        <div class="page-process">
          <div class="page-process-box">
            <div class="page-process-line" style="width: 100%;">
              <div class="page-process-line-cover" style="width: 100%;"></div>
            </div>

            <div class="page-process-item-box">
              <template v-for="item in processList" :key="item.value">
                <div
                  class="page-process-item"
                  :style="{width: `${100 / processList.length}%`}"
                >
                  <div class="process-icon-box">
                    <img class="process-icon" :src="item.icon" alt="" />
                  </div>
                  <div class="process-title">{{ item.label }}</div>
                  <div class="process-time">2025-05-30</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="page-view-item">
        <TitleTabs class="page-view-title-tabs" v-model:active="activeTab" :tabs="tabs" />

        <div class="page-view-handle-detail" v-if="activeTab === PROCESS_TYPE_MAP.SHIP.key">
          <a-form :model="shipForm" :disabled="true">
            <a-form-item label="报警是否正确：" name="isCorrect" class="search-form-item">
              <a-radio-group v-model:value="shipForm.isCorrect" class="search-input">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="2">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <div class="handle-detail-box disabled">
              <div class="handle-detail-title">备注：</div>
              <div class="handle-detail-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci autem corporis delectus, dolore
                dolorem est excepturi explicabo facilis fugiat incidunt itaque modi nihil numquam quae quasi quisquam
                recusandae sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores dolorem
                doloremque dolores explicabo laudantium maxime minus nemo non nulla numquam omnis perferendis quia,
                sapiente sunt tempore vero, voluptates voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Ad aliquam architecto assumenda cumque deleniti dolores ex ipsum itaque laborum maxime minus neque
                obcaecati odit omnis, placeat quam quia repellendus similique.
              </div>
            </div>
          </a-form>
        </div>
        <div class="page-view-handle-detail" v-if="activeTab === PROCESS_TYPE_MAP.SHORE.key">
          <a-form :model="shoreForm" :disabled="true">
            <a-form-item label="报警是否正确：" name="isCorrect" class="search-form-item">
              <a-radio-group v-model:value="shoreForm.isCorrect" class="search-input">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="2">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <div class="handle-detail-box disabled">
              <div class="handle-detail-title">备注：</div>
              <div class="handle-detail-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci autem corporis delectus, dolore
                dolorem est excepturi explicabo facilis fugiat incidunt itaque modi nihil numquam quae quasi quisquam
                recusandae sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores dolorem
                doloremque dolores explicabo laudantium maxime minus nemo non nulla numquam omnis perferendis quia,
                sapiente sunt tempore vero, voluptates voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Ad aliquam architecto assumenda cumque deleniti dolores ex ipsum itaque laborum maxime minus neque
                obcaecati odit omnis, placeat quam quia repellendus similique.
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getArrayMapFromMap } from '@/pages/monitor/utils/utils.js'
import BreadcrumbItems from '@/pages/monitor/components/breadcrumbItems'
import TitleTabs from '@/pages/monitor/components/titleTabs'
import LivePlayer from '@/pages/monitor/components/livePlayer'
import { WARN_PROCESSING_STATE_MAP } from '@/pages/monitor/constants/warn.js'
import startProcessIcon from '@/pages/monitor/assets/images/start_process.png'

defineOptions({ name: 'WarnListViewPage' })
const PROCESS_TYPE_MAP = {
  SHIP: {
    label: '船长处理详情',
    key: '1'
  },
  SHORE: {
    label: '岸基处理详情',
    key: '2'
  }
}

const activeTab = ref(null)
const tabs = ref(getArrayMapFromMap(PROCESS_TYPE_MAP))
const START_PROCESS_STATE = {
  value: '-1',
  label: '系统已识别，报警已触发',
  icon: startProcessIcon
}
const activeState = ref(null)
const processList = ref([])
// 船长是否处理
const shipForm = ref({
  isCorrect: ''
})
// 岸基是否处理
const shoreForm = ref({
  isCorrect: ''
})

const getData = () => {
  setTimeout(() => {
    activeState.value = WARN_PROCESSING_STATE_MAP.SHORE_PROCESSED.value
    setProcessItems(activeState.value)
  }, 500)
}

const setProcessItems = (state) => {
  switch (state) {
    case WARN_PROCESSING_STATE_MAP.SHIP_UN_PROCESSED.value: // 船长未处理逻辑
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHIP_UN_PROCESSED
      ]
      break
    case WARN_PROCESSING_STATE_MAP.SHIP_PROCESSED.value: // 船长已处理逻辑
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHIP_UN_PROCESSED,
        WARN_PROCESSING_STATE_MAP.SHIP_PROCESSED
      ]
      break
    case WARN_PROCESSING_STATE_MAP.SHIP_FAULT.value: // 船长处理系统误报警
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHIP_UN_PROCESSED,
        WARN_PROCESSING_STATE_MAP.SHIP_FAULT
      ]
      break
    case WARN_PROCESSING_STATE_MAP.SHORE_UN_PROCESSED.value: // 岸基未处理逻辑
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHORE_UN_PROCESSED
      ]
      break
    case WARN_PROCESSING_STATE_MAP.SHORE_PROCESSED.value: // 岸基已处理逻辑
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHORE_UN_PROCESSED,
        WARN_PROCESSING_STATE_MAP.SHORE_PROCESSED
      ]
      break
    case WARN_PROCESSING_STATE_MAP.SHORE_FAULT.value: // 船长处理系统误报警
      processList.value = [
        START_PROCESS_STATE,
        WARN_PROCESSING_STATE_MAP.SHORE_UN_PROCESSED,
        WARN_PROCESSING_STATE_MAP.SHORE_FAULT
      ]
      break
    default:
      break
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.page-content {
  box-sizing: border-box;
  margin: 24px;

  .page-view-content {
    margin-top: 24px;

    .page-view-item {
      margin-bottom: 16px;
      background-color: #041A46;

      .page-view-title {
        font-weight: 500;
        font-size: 18px;
        color: #198DFF;
        line-height: 22px;
        padding: 25px 42px;
        border-bottom: 1px solid rgba(242, 252, 255, 0.08);
      }

      .page-view-form {
        padding: 32px 42px 10px;

        .page-view-form-detail {
          display: flex;
          flex-wrap: wrap;

          .form-detail-item {
            width: 268px;
            margin-right: 42px;
            margin-bottom: 32px;

            &:nth-child(5n) {
              margin-right: 0;
            }

            .form-detail-item-label {
              margin-bottom: 8px;
            }

            .form-detail-item-value {
              display: flex;
              align-items: center;
              padding: 7px 12px;
              background: rgba(242, 252, 255, 0.1);
              border-radius: 4px;
              font-weight: 400;
              font-size: 16px;
              color: #F2FCFF;
            }

            .form-detail-item-img {
              width: 268px;
              height: 150px;
              border-radius: 4px;
              background: rgba(242, 252, 255, 0.1);
              overflow: hidden;

              .img {
                width: 100%;
                height: 100%;
              }

              .detail-form-video {
                :deep(.vjs-control-bar) {
                  .vjs-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 3em;

                    > span {
                      &::before {
                        font-size: 1.4em;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .page-process {
        padding: 60px 150px;

        .page-process-box {
          .page-process-line {
            position: relative;
            width: 100%;
            height: 16px;
            background: #1D3159;
            box-shadow: inset 0 1px 4px 0 #3684A8;
            border-radius: 8px;

            .page-process-line-cover {
              position: absolute;
              top: 50%;
              left: 3px;
              transform: translateY(-50%);
              max-width: calc(100% - 6px);
              height: calc(100% - 6px);
              background: linear-gradient(270deg, #00FEF8 0%, rgba(0, 254, 248, 0.55) 45%, rgba(0, 120, 252, 0) 100%);
              border-radius: 8px;

              &::before {
                z-index: 2;
                content: '';
                position: absolute;
                left: -3px;
                top: 50%;
                transform: translateY(-50%);
                width: 16px;
                height: 16px;
                background: #1890FF;
                border-radius: 50%;
                box-shadow: inset 0 1px 2px 0 rgba(7, 24, 40, 0.66);
              }

              &::after {
                z-index: 3;
                content: '';
                position: absolute;
                right: -3px;
                top: 50%;
                transform: translateY(-50%);
                width: 18px;
                height: 18px;
                background: #DDF0F6;
                border: 3px solid #1887EF;
                border-radius: 50%;
              }
            }
          }

          .page-process-item-box {
            display: flex;

            .page-process-item {
              margin-top: 32px;
              text-align: center;

              &:first-child {
                text-align: left;
              }

              &:last-child {
                text-align: right;
              }

              .process-icon-box {
                margin-bottom: 11px;

                .process-icon {
                  width: 34px;
                  height: 34px;
                }
              }

              .process-title {
                margin-bottom: 4px;
                font-weight: 400;
                font-size: 16px;
                color: rgba(242, 252, 255, 1);
                line-height: 22px;
              }

              .process-time {
                font-weight: 400;
                font-size: 14px;
                color: rgba(242, 252, 255, .5);
                line-height: 20px;
              }
            }
          }
        }
      }

      .page-view-title-tabs {
        border-bottom: 1px solid rgba(242, 252, 255, 0.08);
      }

      .page-view-handle-detail {
        padding: 32px 42px;

        .handle-detail-box {
          // 禁用状态
          &.disabled {
            .handle-detail-content {
              opacity: 0.5;
            }
          }
          
          .handle-detail-title {
            color: rgba(242, 252, 255, 1);
            margin-bottom: 8px;
          }

          .handle-detail-content {
            white-space: wrap;
            word-break: break-all;
            padding: 16px 24px;
            background: rgba(242, 252, 255, 0.1);
            border-radius: 4px;
            font-weight: 400;
            font-size: 16px;
            color: rgba(242, 252, 255, .9);
            line-height: 27px;
          }
        }
      }
    }
  }
}
</style>