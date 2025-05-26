<template>
  <div class="page-container">
    <div class="page-menu-box" :class="[{'expended': expended}]">
      <!--顶部logo-->
      <div class="header-logo">
        <img class="header-logo-icon" src="@/pages/monitor/assets/images/login_logo.png" alt="船舶智能监控系统" />
        <div class="header-platform-name text-overflow" v-show="!expended">船舶智能监控系统</div>
      </div>
      <!--菜单-->
      <div class="menu-box">
        <MenuItems :inline-collapsed="expended" />
      </div>
      <!--展开收起按钮-->
      <div class="expend-box" @click="toggleExpend">
        <MenuUnfoldOutlined class="expend-icon" v-if="expended" />
        <MenuFoldOutlined class="expend-icon" v-else />
      </div>
    </div>
    <div class="page-content-box" :class="[{'expended': expended}]">
      <!--顶部nav-->
      <div class="page-content-header">
        <!--面包屑-->
        <BreadcrumbItems />

        <!--右侧功能-->
        <div class="page-content-header_right">
          <a-space class="user-info-box">
            <a-avatar :size="20">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <span>{{ userInfo.userName }}</span>
          </a-space>

          <a-popconfirm
            placement="bottomRight"
            title="确认登出系统吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="logout"
          >
            <div class="logout-btn">
              <PoweroffOutlined />
            </div>
          </a-popconfirm>
        </div>
      </div>
      <!--页面内容-->
      <div class="page-content">
        <div class="page-content-slot">
          <slot v-if="hasDefaultSlot" />
          <router-view v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { cleanTokenFromApplication } from '@/pages/monitor/utils/userInfo.js'
import MenuItems from './menuItems.vue'
import BreadcrumbItems from './breadcrumbItems.vue'
import { useUserControl } from '@/pages/monitor/stores/userControl.js'

defineOptions({ name: 'PageLayout' })

const slots = useSlots()
// 判断默认插槽是否存在内容
const hasDefaultSlot = computed(() => {
  return !!slots.default && slots.default().length > 0
})

const expended = ref(false)
const toggleExpend = () => {
  expended.value = !expended.value
}

const logout = () => {
  console.log('logout')
  cleanTokenFromApplication()
  window.location.href = '/monitor/#/login'
}

const userControl = useUserControl()
const { userInfo } = storeToRefs(userControl)

onMounted(() => {
  userControl.getUserInfoAction()
})
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .page-menu-box {
    position: relative;
    width: 240px;
    border-right: 1px solid rgb(5 5 5/6%);
    transition: all .2s ease-in-out;

    // 侧边栏收起状态
    &.expended {
      width: 58px;
    }

    .header-logo {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 18px;
      font-weight: bold;
      //border-bottom: 1px solid rgb(5 5 5/6%);

      .header-logo-icon {
        width: 42px;
        margin: 0 8px;
      }

      .header-platform-name {
        width: auto;
      }
    }

    .menu-box {
      overflow-y: auto;
      position: absolute;
      top: 65px;
      right: 0;
      bottom: 40px;
      left: 0;
    }

    .expend-box {
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      box-shadow: 0 0 6px -3px #409EFF;
      font-size: 20px;

      .expend-icon {
        margin: 0 8px;
      }
    }
  }

  .page-content-box {
    position: relative;
    width: calc(100vw - 241px);
    background-color: rgba(240, 242, 245, 1);

    &.expended {
      width: calc(100vw - 59px);
    }

    .page-content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      padding: 0 24px;
      background-color: #ffffff;
      border-bottom: 1px solid rgb(5 5 5/6%);

      .page-content-header_right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .user-info-box {
          margin: 0 8px;
        }

        .logout-btn {
          font-size: 16px;
          padding: 8px;
        }
      }
    }

    .page-content {
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      max-height: calc(100vh - 65px);

      .page-content-slot {
        margin: 16px;
      }
    }
  }
}
</style>
