<template>
  <div class="page-container" :class="{'is-expended': expended}">
    <div class="page-menu-box">
      <!--顶部logo-->
      <div class="header-logo">
        <img class="header-logo-icon" src="@/pages/demo/assets/images/animate_loading.svg" alt="船舶智能监控系统" />
        <div class="header-platform-name text-overflow" v-show="!expended">船舶智能监控系统</div>
      </div>
      <!--菜单-->
      <div class="menu-box">
        <MenuItems :inline-collapsed="expended" />
      </div>
      <!--展开收起按钮-->
      <div class="expend-box" @click="expendedControl.toggleExpend">
        <MenuUnfoldOutlined class="expend-icon" v-if="expended" />
        <MenuFoldOutlined class="expend-icon" v-else />
      </div>
    </div>
    <div class="page-content-box">
      <!--顶部nav-->
      <div class="page-content-header">
        <!--面包屑-->
        <div>
          <!--<BreadcrumbItems />-->
        </div>

        <!--右侧功能-->
        <div class="page-content-header_right">
          <a-space class="user-info-box">
            <!--TODO MOCK DATA-->
            <!--<NetStateBox :status="1"/>-->
            <TimeBox />
            <!--    <a-avatar :size="20">-->
            <!--      <template #icon>-->
            <!--        <UserOutlined />-->
            <!--      </template>-->
            <!--    </a-avatar>-->
            <!--    <span>{{ userInfo.userName }}</span>-->
          </a-space>

          <!--  <a-popconfirm-->
          <!--    placement="bottomRight"-->
          <!--    title="确认登出系统吗？"-->
          <!--    ok-text="是"-->
          <!--    cancel-text="否"-->
          <!--    @confirm="logout"-->
          <!--  >-->
          <!--    <div class="logout-btn">-->
          <!--      <PoweroffOutlined />-->
          <!--    </div>-->
          <!--  </a-popconfirm>-->
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
import { computed, ref, useSlots } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { cleanTokenFromApplication } from '@/pages/demo/utils/userInfo.js'
import { useExpendedControl } from '@/pages/demo/stores/menuExpendControl.js'
import MenuItems from './menuItems.vue'
import { storeToRefs } from 'pinia'
import TimeBox from '@/pages/demo/components/timeBox'
// import NetStateBox from '@/pages/index/components/netStateBox'
// import BreadcrumbItems from './breadcrumbItems.vue'

defineOptions({ name: 'PageLayout' })

const slots = useSlots()
// 判断默认插槽是否存在内容
const hasDefaultSlot = computed(() => {
  return !!slots.default && slots.default().length > 0
})

const expendedControl = useExpendedControl()
const { expended } = storeToRefs(expendedControl)

const logout = () => {
  console.log('logout')
  cleanTokenFromApplication()
  window.location.href = '/demo/#/login'
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(2, 17, 51, 1);

  &.is-expended {
    .page-menu-box {
      width: 58px;

      .header-logo {
        .header-logo-icon {
          margin: 0 auto;
        }
      }
    }

    .page-content-box {
      width: calc(100vw - 59px);
    }

    .expend-box {
      .expend-icon {
        margin: 0 auto;
      }
    }
  }

  .page-menu-box {
    position: relative;
    width: 270px;
    //border-right: 1px solid rgb(5 5 5/6%);
    transition: all .2s ease-in-out;
    background-color: rgba(2, 17, 51, 1);

    .header-logo {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: 80px;
      font-size: 18px;
      font-weight: bold;
      //border-bottom: 1px solid rgb(5 5 5/6%);
      background-color: rgba(4, 26, 71, 1);

      .header-logo-icon {
        width: 25px;
        margin: 0 6px 0 20px;
      }

      .header-platform-name {
        width: auto;
        font-weight: 500;
        font-size: 20px;
        color: rgba(242, 252, 255, 1);
        line-height: 28px;
      }
    }

    .menu-box {
      overflow-y: auto;
      position: absolute;
      top: 80px;
      right: 0;
      bottom: 40px;
      left: 0;
      background-color: rgba(4, 26, 71, 1);
    }

    .expend-box {
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
      font-size: 24px;
      color: rgba(242, 252, 255, 1);
      background-color: rgba(4, 26, 71, 1);

      .expend-icon {
        margin: 0 16px;
      }
    }
  }

  .page-content-box {
    position: relative;
    width: calc(100vw - 241px);
    color: rgba(242, 252, 255, 1);

    .page-content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 24px;
      background-color: rgba(4, 26, 71, 1);
      //border-bottom: 1px solid rgb(5 5 5/6%);

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
      max-height: calc(100vh - 80px);

      .page-content-slot {
      }
    }
  }
}
</style>
