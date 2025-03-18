<template>
  <div class="top-box">
    <selectBox
      v-model:value="mmsi"
      :options="boats"
      :options-props="{
        name: 'name',
        value: 'mmsi',
        key: 'mmsi',
      }"
      @change="handleChangeBoat"
    />
    <div class="top-title">
      <span class="top-title_title">设备信息</span>
    </div>
    <div class="new-select-btn back-btn" @click.stop="backHandler">
      <img class="back-icon" src="@/assets/images/back_btn_icon.png" alt="" />
      <span>返回</span>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { BOAT_INFO } from '@/provide/boat.js'
import selectBox from '@/components/selectBoxNew'

defineOptions({ name: 'PageNormalHeader' })

const emit = defineEmits(['back', 'changeBoat'])
const props = defineProps({
  boat: {
    type: String,
    default: '',
  },
})

const mmsi = ref(null) // 当前的选中的船舶
const boatInfoInject = inject(BOAT_INFO)
const boats = boatInfoInject.boats

const handleChangeBoat = (boat) => {
  emit('changeBoat', boat)
}

const backHandler = () => {
  emit('back')
}

onMounted(() => {
  mmsi.value = props.boat
})
</script>

<style lang="scss" scoped>
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
    background-image: url('@/assets/images/device_top_component_title.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .top-title_title {
      font-family: YouSheBiaoTiHei;
      font-size: vh(24);
      letter-spacing: vw(2);
    }

    .update-time {
      position: absolute;
      left: vw(20);
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
</style>
