<template>
  <div class="data-analysis-container">
    <div class="left-box" :class="{'is-collapsed': collapsed}">
      <div class="logo-box">
        <img class="logo-icon" src="../../assets/images/data_analysis_icon.png" alt="历史数据分析" />
        <p class="logo-text" v-if="!collapsed">历史数据分析</p>
      </div>
      <div class="menu-box">
        <div class="menu-list">
          <div class="menu-item active">
            <p class="menu-text">左主机</p>
            <RightOutlined class="menu-arr" />
          </div>
          <div class="menu-item">
            <p class="menu-text">右主机</p>
            <RightOutlined class="menu-arr" />
          </div>
          <div class="menu-item">
            <p class="menu-text">电机一</p>
            <RightOutlined class="menu-arr" />
          </div>
          <div class="menu-item">
            <p class="menu-text">电机二</p>
            <RightOutlined class="menu-arr" />
          </div>
          <div class="menu-item">
            <p class="menu-text">电机三</p>
            <RightOutlined class="menu-arr" />
          </div>
          <div class="menu-item">
            <p class="menu-text">电机四</p>
            <RightOutlined class="menu-arr" />
          </div>
        </div>

        <MenuUnfoldOutlined v-if="collapsed" class="collapse-item" @click="toggleCollapsed" />
        <MenuFoldOutlined v-else class="collapse-item" @click="toggleCollapsed" />
      </div>
    </div>
    <div class="right-box">
      <div class="top-header-box">
        <TimeBox class="top-timer" />
      </div>

      <div class="page-content">
        <a-tabs v-model:activeKey="activeKey" class="custom-tabs">
          <a-tab-pane v-for="(item, index) in systemClassify" :key="item.id" :tab="item.name">
            <component :is="item.component" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, markRaw } from 'vue'
import { RightOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import TimeBox from '@/pages/index/components/timeBox/index.vue'
import SystemStateCharts from './components/SystemStateCharts/index.vue'
import ParamStateCharts from './components/ParamStateCharts/index.vue'
import { systemClassifyData } from './data'

defineOptions({ name: 'DataAnalysisPage' })

const collapsed = ref(false)
const systemState = {
  id: 'systemState',
  name: '运行状态',
  component: markRaw(SystemStateCharts)
}
const activeKey = ref(systemState.id)
const systemClassify = ref([])
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

const getSystemClassifyData = () => {
  // TODO MOCK DATA
  systemClassify.value = [
    systemState,
    ...(
      systemClassifyData.map(item => {
        return {
          ...item,
          component: markRaw(ParamStateCharts)
        }
      })
    )
  ]
  // activeKey.value = systemClassifyData[0].id
}

onBeforeMount(() => {
  getSystemClassifyData()
})

</script>

<style scoped lang="scss">
.data-analysis-container {
  display: flex;
  height: 100vh;
  background: #01163C;

  .left-box {
    overflow: hidden;
    position: relative;
    width: 250px;
    border-right: 2px solid rgba(255, 255, 255, 0.3);
    background: #002056;
    transition: width 0.18s ease-in-out;

    &.is-collapsed {
      width: 100px;

      .collapse-item {
        right: 50%;
        transform: translateX(50%);
      }

      .logo-box {
        .logo-icon {
          margin-right: 0;
        }
      }

      .menu-box {
        .menu-list {
          .menu-item {
            .menu-text {
              margin-left: 20px;
            }
          }
        }
      }
    }

    .logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.3);;

      .logo-icon {
        width: 24px;
        margin-right: 12px;
      }

      .logo-text {
        font-weight: 500;
        font-size: 24px;
        color: #F2FCFF;
        line-height: 33px;
      }
    }

    .collapse-item {
      position: absolute;
      right: 24px;
      bottom: 24px;
      font-size: 24px;
      color: #f2fcff;
      cursor: pointer;
    }

    .menu-box {
      .menu-list {
        .menu-item {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 251px;
          height: 62px;
          cursor: pointer;

          .menu-text {
            font-size: 16px;
            margin-left: 52px;
            color: rgba(242, 252, 255, .7);
          }

          .menu-arr {
            margin-right: 24px;
            color: rgba(242, 252, 255, .7);
          }

          &:hover, &.active {
            background: rgba(242, 252, 255, 0.1);

            .menu-text {
              font-size: 18px;
            }

            .menu-text, .menu-arr {
              color: rgba(0, 252, 238, 1);
            }

            &::before {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 6px;
              background: rgba(0, 252, 238, 1);
              border-radius: 0 5px 5px 0;
            }
          }
        }
      }
    }
  }

  .right-box {
    flex: 1;

    .top-header-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 84px;
      background: #002056;

      .top-timer {
        margin-right: vw(46);
      }
    }

    .page-content {
      height: calc(100vh - 84px);
      padding: 42px 52px 52px;
    }
  }
}
</style>