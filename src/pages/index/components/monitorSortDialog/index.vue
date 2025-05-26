<template>
  <div class="over-mask" v-if="show">
    <div class="drag-box">
      <CloseOutlined class="close-btn" @click.stop="close" />
      <div class="left-box">
        <div class="title">未配置监控</div>
        <VueDraggable
          class="drag-list unset"
          :key="`unset_${unSetKey}`"
          v-model="unSetConfigsList"
          animation="150"
          ghostClass="ghost"
          group="device"
          :filter="unsetFilter"
        >
          <div v-for="item in unSetConfigsList" :key="`drag_item_${item.id}`" class="drag-item">
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
      <div class="right-box">
        <div class="title">已配置监控（最多4屏）</div>
        <VueDraggable
          class="drag-list settled"
          :key="`settled_${settledKey}`"
          v-model="settledConfigsList"
          animation="150"
          ghostClass="ghost"
          group="device"
        >
          <div
            v-for="item in settledConfigsList"
            :key="`drag_item_${item.id}`"
            class="drag-item"
            :class="[`class-${item.name}`]"
          >
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
      <div class="btn-box">
        <div class="btn" @click.stop="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({ name: 'MonitorSortDialog' })
const emit = defineEmits(['close'])
const show = ref(false)
const allConfigList = ref([])
const unSetConfigsList = ref([])
const settledConfigsList = ref([])
const configIds = ref([])
const unSetKey = ref(Date.now())
const settledKey = ref(Date.now())

const open = (configList, configs) => {
  allConfigList.value = configList
  unSetConfigsList.value = configList.filter((item) => {
    return !configs.includes(item.id)
  })
  settledConfigsList.value = configList.filter((item) => {
    return configs.includes(item.id)
  })
  configIds.value = configs
  show.value = true
}

const close = () => {
  show.value = false
  emit('close', {
    configs: configIds.value,
    unSetConfigsList: unSetConfigsList.value,
    settledConfigsList: settledConfigsList.value,
  })
}

const save = () => {
  configIds.value = settledConfigsList.value.map((item) => item.id)
  close()
}

const unsetFilter = () => {
  if (settledConfigsList.value.length >= 4) {
    return unSetConfigsList.value.map((item) => `class-${item.name}`).join(',')
  }
  return ''
}

defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped>
.over-mask {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.9);

  .drag-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    width: vw(500);
    padding: vh(50) vw(20) vh(20);
    border-radius: vh(8);
    background-color: rgba(2, 12, 48, 1);

    .close-btn {
      position: absolute;
      right: vw(10);
      top: vh(10);
      font-size: vh(24);
    }

    .btn-box {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: vh(20) vw(20) 0;
    }

    .left-box,
    .right-box {
      align-items: center;
      width: 48%;
      height: 100%;
      border-radius: vh(8);
      background-image: linear-gradient(
        180deg,
        rgba(52, 88, 155, 0.27) 0%,
        rgba(48, 97, 219, 0.29) 100%
      );

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: vh(50);
        font-size: vh(20);
      }

      .drag-list {
        overflow-y: auto;
        height: vh(540);

        .drag-item {
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          height: vh(40);
          margin: vh(10) vw(10);
          //border: 1px solid rgba(1, 121, 182, 1);
          background-color: rgba(1, 121, 182, 1);
          border-radius: vh(6);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
