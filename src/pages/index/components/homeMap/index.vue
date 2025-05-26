<template>
  <pageLayout :container-style="{ margin: 0 }">
    <!--<div class="btn back-btn" @click.stop="goBack">返回</div>-->
    <div class="map-page-box">
      <div class="map-container">
        <div class="haike-box">
          <haikeMap ref="haikeMapRef" :ship-list="boats" />
        </div>
      </div>
    </div>
  </pageLayout>
</template>

<script setup>
import pageLayout from '@/pages/index/components/pageLayout/index.vue'
import haikeMap from '@/pages/index/components/haikeMap/index.vue'
import { ref, onMounted, inject } from 'vue'
import { getShipList } from '@/pages/index/api/device.js'
import { BOAT_INFO } from '@/pages/index/provide/boat.js'

defineOptions({ name: 'HomeMap' })

const haikeMapRef = ref(null)
const boats = ref([]) // 船舶数据

const boatInfoInject = inject(BOAT_INFO)

/**
 * @function getShipListData
 * @description 获取船舶列表数据
 **/
const getShipListData = () => {
  getShipList().then((res) => {
    console.log('船舶数据', res.data)
    boats.value = res.data // res.data.filter((item) => item.latitude && item.longitude)
    boatInfoInject.setBoats(res.data)
  })
}

onMounted(() => {
  getShipListData()
})
</script>

<style scoped lang="scss">
.map-page-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .map-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: vh(10) vw(10);
    margin: 0 auto;
    overflow: hidden;
    //background-image: url('@/assets/images/map_bg.png');
    //background-repeat: no-repeat;
    //background-position: center;
    //background-size: 100% 100%;

    .haike-box {
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      //width: calc(100% - vw(20));
      //height: calc(100% - vh(20));
      background: #020c30;
      //border-radius: vw(6);
    }
  }
}

.back-btn {
  position: absolute;
  top: vh(-40);
  right: 0;
}
</style>
