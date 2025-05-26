<template>
  <div class="about">
    <div class="box">
      <iframe id="iframe" :src="state.url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<!-- 1.设置图层放大缩放大小（setZoomTo）：参数 1-20，默认图层大小12
2.图层样式（setMapType）：参数  0为海图，1为卫星图
3.设置中心点位（fnSetMapCenterPosition）：转json接收，取longitude和latitude
4.设置港口坐标点（setPortPosition）：转json接收
5.设置船舶坐标点（setShipPosition）：转json接收
6.marker点击方法回调：船舶（shipClick），港口（portClick）

 新增：1.开始绘制图形（startDraw）：参数//矩形：Rectangle, 多边形：Polygon, 圆：Circle
 2.停止绘制图形（stopDraw）：
 js-安卓：
 1.绘制图形点坐标(drawLocation)
 -->
<script setup>
import { debounce } from '@/pages/index/utils/utils.js'
import { onMounted, ref, reactive, getCurrentInstance } from 'vue'
import md5 from 'js-md5'
import gcoord from 'gcoord'

let type = ref(1) // 1 港口 2 船舶]
let zoom = ref(7) // 默认 7
let isDraw = ref(false) // 是否是 绘制图像
let iFrame = reactive(null)
let apiToken = ref() // 请求 token
let latCenter = ref('')
let lonCenter = ref('')
const instance = getCurrentInstance()
let areaIds = reactive([1, 2, 3, 4])
// 使用 instance.appContext.config.globalProperties 访问全局属性
// 使用 instance.ctx 访问Vue 2.x中的this
// 使用 instance.proxy 来代理组件实例
const $bridge = instance.appContext.config.globalProperties.$bridge
const state = reactive({
  show: false,
  url: 'https://emb.data.myvessel.cn/microapps/app-map-w?map=satellite',
})

//触发事件监听
const iframLoad = () => {
  window.addEventListener(
    'message',
    (e) => {
      // 点击船舶、港口位置
      if (e.data.type === 'ON_CLICK_POSITION') {
        console.log('ON_CLICK_POSITION------', e)
        if (e.data.data.position.bindType === 2) {
          debounce(fnMarkerPortClickCallBack(e.data.data), 600, true)
        } else if (e.data.data.position.bindType === 1) {
          debounce(fnMarkerShipClickCallBack(e.data.data), 600, true)
        }
      }
      // 点击地图事件
      if (e.data.type === 'ON_MAP_CLICK') {
        console.log('ON_MAP_CLICK---------', e)
        // true 绘制图像，false ，港口。船舶点击
        if (isDraw) {
          debounce(fnDrawLocation(e.data.data), 600, true)
        }
      }
      if (e.data.type === 'ON_MAP_ZOOM') {
        // 初始化回调 app
        // zoom.value = e.data.data.zoom
        console.log(e.data.data.zoom, '滑动')
        fnMapMove(e.data.data)
      }
      if (e.data.type === 'ON_MAP_READY') {
        // 初始化回调 app
        fnMapReady()
      }
      if (e.data.type === 'MAP_CLEAR') {
        if (apiToken.value) fnSetToken(apiToken.value)
        console.log(apiToken.value, 'apiToken.value')
      }
      if (e.data.type === 'MAP_CLEAR') {
        if (latCenter.value && lonCenter.value) fnSetCenterMark(latCenter.value, lonCenter.value)
      }
      // REMOVE_AREAS
      console.log(e.data.type, 'type', e.data)
    },
    false,
  )
}

// js - 回传给  - 安卓
const fnDrawLocation = (data) => {
  // uni.showToast({
  // 	title: 'drawlocation' + JSON.stringify(data),
  // 	duration: 5000,
  // 	icon: 'none'
  // })

  const device = getDeviceType()
  if (device === 'Android') {
    // andriod
    window?.android?.drawLocation(JSON.stringify(data))
  } else if (device === 'iOS') {
    // ios
    window?.webkit?.messageHandlers.drawLocation.postMessage(JSON.stringify(data))
  }
}
// 地图加载完毕 调用 app
const fnMapReady = () => {
  const device = getDeviceType()

  console.log('device', device)
  if (device === 'Android') {
    // andriod
    window?.android?.onMapReady()
  } else if (device === 'iOS') {
    // ios
    window?.webkit?.messageHandlers?.onMapReady.postMessage('')
  }
}
const fnMapMove = (data) => {
  const { zoom } = data
  const device = getDeviceType()
  // uni.showToast({
  // 	title: 'zoom' + JSON.stringify(zoom),
  // 	duration: 1000,
  // 	icon: 'none'
  // })
  console.log('device', device, zoom)
  if (device === 'Android') {
    // andriod
    window?.android?.onMapMove(zoom)
  } else if (device === 'iOS') {
    // ios
    window?.webkit?.messageHandlers?.onMapMove.postMessage(zoom)
  }
}
const toShowIframe = () => {
  fnSetMapCenterPosition({
    longitude: 23.65488,
    latitude: 35.5545,
  })
}

// 清除面
const fnClearAreas = (ids) => {
  const options = {
    type: 'REMOVE_AREAS',
    data: {
      ids: areaIds && areaIds.join(','), //字符串 多个用,分割
    },
  }
  areaIds = []
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(options, '*')
  setTimeout(() => {
    // 重置上一次的 areaIds
    areaIds = []
    console.log(areaIds, 'areaIds')
    // 重新绘制
    fnNetMarkList()
  }, 500)
}
const fnClickMapType = (mapType) => {
  //切换地图
  const mapTypeOption = {
    type: 'CHANGE_MAP_TYPE',
    data: {
      mapType, //'normal'-常规地图 'ocean'-海图 'satellite'-卫星图  'landsea'-海陆图
    },
  }
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(mapTypeOption, '*')
}
// 发送消息，设置内容
const fnSetMapMark = (data) => {
  let newData = data
  if (!Array.isArray(data)) {
    newData = [data]
  }
  // 绘制区
  let options = {
    type: 'DRAW_AREA',
    data: {
      list: [],
      isFitMap: false,
    },
  }
  options.data.list = newData.filter((item) => {
    areaIds.push(item.id)
    item.color = item.colourCode
    item.points = []
    item.pointList.filter((subItem) => {
      // clear({ lat: subItem.lat, lon: subItem.lon })
      item.points.push({
        lat: subItem.lat,
        lon: subItem.lon,
      })
    })
    ;(item.fillOpacity = 0.2), // 填充透明度
      (item.showAreaValue = false), //显示区域面积
      (item.regionType = 'POLYGON'), // 多边形
      delete item.pointList
    return item
  })
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(options, '*')
}

// 设置 zoom
const setMaxZoom = (zoom) => {
  let flag = true
  if (zoom > 18) {
    flag = false
  } else if (zoom < 0) {
    flag = false
  }
  if (flag) {
    const center = {
      type: 'MAP_SETTING',
      data: {
        zoom,
      },
    }
    iFrame = document.getElementById('iframe')
    iFrame.contentWindow.postMessage(center, '*')
  }
}

// 设置中心点
const fnSetMapCenter = ({ lat, lon, zoom }) => {
  const center = {
    type: 'MAP_CENTER',
    data: {
      zoom,
      center: {
        lat,
        lon,
      },
    },
  }
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(center, '*')
  // 设置中心点图表
  fnSetCenterMark(lat, lon)
}

const fnSetCenterMark = (lat, lon) => {
  fnMarkLine([
    {
      lat,
      lon,
      icon: 'https://cdn.dajvision.com/cate/2024/09/30/1727667576093x2N3Neo84I7PZ06.png', //marker地址
      // icon: 'https://v-c.data.myvessel.cn/vvv/vvv64.png',
      size: 20, //marker大小
    },
  ])
}

// 设置任意中心点
const fnSetMapPoint = ({ lat, lon, zoom }) => {
  const center = {
    type: 'MAP_CENTER',
    data: {
      zoom,
      center: {
        lat,
        lon,
      },
    },
  }
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(center, '*')
}

// 清除地图
const fnHandleClearMap = async () => {
  //清除地图
  let data = {
    type: 'MAP_CLEAR',
  }
  iFrame = document.getElementById('iframe')
  await iFrame.contentWindow.postMessage(data, '*')
}

// 绘制 线
const fnMarkLine = (data = []) => {
  let draw = {
    type: 'DRAW_POSITIONS',
    data: {
      positions: [],
      isFitMap: false, //自动适配页面
    },
  }

  if (data.length) {
    // draw.data.positions = []
    let filterData = []
    filterData = data.filter((item) => {
      item.size = 30
      item.name = null
      // item.name = item.aliasName || item.name
      if (!item.lat) item.lat = item.latitude
      if (!item.lon) item.lon = item.longitude

      if (item.lon && item.lat) {
        return item
      }
    })

    draw.data.positions = filterData
    console.log(draw, '348', filterData)
  }

  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(draw, '*')
}

// js 调用原生方法
const fnSetToken = async (token) => {
  const device = getDeviceType()
  if (device === 'Android') {
    // andriod
    if (token) apiToken.value = token
  } else if (device === 'iOS') {
    // ios
    if (token) apiToken.value = 'Bearer ' + token
  }
  // 请求数据列表
  await fnNetShipList()
  await fnNetPortList()
  await fnNetMarkList()
}
// 绘制多边形
const fnShowMarkedSurface = (data) => {
  if (data) fnSetMapMark(data)
}
// 设置 marker 点 船舶 回调方法
const fnMarkerShipClickCallBack = (data) => {
  const device = getDeviceType()
  if (device === 'Android') {
    // andriod
    window?.android?.shipClick(JSON.stringify(data))
  } else if (device === 'iOS') {
    // ios
    window.webkit.messageHandlers.shipClick.postMessage(JSON.stringify(data))
  }
  console.log('fnMarkerShipClickCallBack-----')
}
// 设置 marker 点港口（） 回调方法
const fnMarkerPortClickCallBack = (data) => {
  const device = getDeviceType()
  if (device === 'Android') {
    // andriod
    window?.android?.portClick(JSON.stringify(data))
  } else if (device === 'iOS') {
    // ios
    window.webkit.messageHandlers.portClick.postMessage(JSON.stringify(data))
  }
}
// 原生调用js
// 设置图片放大缩小
const fnSetZoomTo = (zoom) => {
  console.log(455, 'callback')

  setMaxZoom(zoom)
}
// 设置中心点位
const fnSetMapCenterPosition = (params) => {
  const { longitude: lon, latitude: lat } = params

  latCenter.value = lat
  lonCenter.value = lon
  fnSetMapCenter({
    lat,
    lon,
    zoom: 7,
  })
}

// 设置点位
const fnSetPosition = (params) => {
  const { longitude: lon, latitude: lat } = params

  fnSetMapPoint({
    lat,
    lon,
    zoom: 7,
  })
}
// 设置图层
const fnSetMapType = (type) => {
  const typeName = type == 0 ? 'ocean' : 'satellite'

  fnClickMapType(typeName)
}
// 绘制图形开始
const fnHandleStartDraw = () => {
  isDraw = true
  //清除地图
  let data = {
    type: 'START_DRAW',
    data: {
      regionType: 'Polygon', // 矩形：Rectangle, 多边形：Polygon, 圆：Circle
    },
  }
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(data, '*')
}

// 绘制图形结束
const fnHandleEndDraw = () => {
  isDraw = false
  //清除地图
  let data = {
    type: 'END_DRAW',
    data: {
      regionType: 'Polygon', // 矩形：Rectangle, 多边形：Polygon, 圆：Circle
    },
  }
  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(data, '*')
}

// 根据经纬度清除点，可以多个，可单个
const fnClearMark = () => {
  //移除位置
  let moveposition = {
    type: 'REMOVE_POSITIONS',
    data: {
      positionList: [
        {
          lat: '48.231941',
          lon: '130.385895',
        },
      ],
    },
  }

  iFrame = document.getElementById('iframe')
  iFrame.contentWindow.postMessage(moveposition, '*')
}
//判断 设备端
const getDeviceType = () => {
  const userAgent = navigator.userAgent

  if (/android/i.test(userAgent)) {
    return 'Android'
  } else if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
    return 'iOS'
  } else {
    return 'Other'
  }
}
// 经纬度转换
const convertLatLng = (lat, lon) => {
  // lat,lon // 113.591207,34.783868
  // 目标的坐标，当前坐标系，目标坐标系
  const result = gcoord.transform([lat, lon], gcoord.WGS84, gcoord.BD09)
  const [lat1, lon1] = result
  // result => [113.57856168856712, 34.77936129852351] WGS84(目标)
  // result => [113.60380460520236, 34.78849246735249] BD09(目标)
  console.log(result, '转换结果')

  fnSetMapCenter(lat1, lon1)
}

// 清除数据,重新渲染
const fnInit = async () => {
  await fnHandleClearMap()
}
const getAuthkey = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const rand = 'aabbcc' // 随机字符串
  const account = 'djyskjahyxgs_app01'
  const secret = 'b0e5487d5cf9cca46f9fd90cf22cc14f'
  const md5Hash = md5(`${timestamp}-${rand}-${account}-${secret}`)
  const authKey = `${timestamp}-${rand}-${account}-${md5Hash}`
  // showSearch=true  显示搜索框
  // 1724114973-Tqt5iFvX-ysy_app07-6f6c3c777557d5120806c2b9a8d0bccc
  // console.log('============================', JSON.stringify(`https://emb.data.myvessel.cn/microapps/app-map-w?auth_key=${authKey}&showSearch=false&hideRightToolbar=true&map=satellite&maxZoom=17`));
  state.url = `https://emb.data.myvessel.cn/microapps/app-map-w?auth_key=${authKey}&showSearch=false&hideRightToolbar=true&map=satellite&maxZoom=17`
  // state.url = `https://emb.data.myvessel.cn/microapps/app-map-w?auth_key=1724114973-Tqt5iFvX-ysy_app07-6f6c3c777557d5120806c2b9a8d0bccc&showSearch=true`
}
// 船舶列表
const fnNetShipList = () => {
  fetch('https://app.dajvision.com/gather/gather-shipping/list', {
    headers: {
      Authorization: apiToken.value,
    },
    type: 'json',
  })
    .then((response) => {
      //处理http响应
      return response.json()
    })
    .then((res) => {
      if (res.code === '20001') {
        fnMarkLine(res.data) // 绘制 marker 点
      }
    })
}

// 港口请求列表
const fnNetPortList = () => {
  fetch('https://app.dajvision.com/gather/gather-port/list', {
    headers: {
      Authorization: apiToken.value,
    },
    type: 'json',
  })
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      if (res.code === '20001') {
        fnMarkLine(res.data) // 绘制 marker 点
      }
    })
}
// 多边形面数据
const fnNetMarkList = async () => {
  fetch('https://app.dajvision.com/mark/mark/list', {
    headers: {
      Authorization: apiToken.value,
    },
    type: 'json',
  })
    .then(
      (response) => {
        return response.json()
      },
      (error) => {
        //处理错误
      },
    )
    .then((res) => {
      if (res.code === '20001') {
        fnSetMapMark(res.data) // 绘制多边形
      }
    })
}

onMounted(() => {
  getAuthkey()
  // 全局事件监听
  iframLoad()

  // 设置位置
  window.setPosition = fnSetPosition
  window.addToken = fnSetToken
  // 设置缩小放大
  window.setZoomTo = fnSetZoomTo
  // 设置开始绘画
  window.startDraw = fnHandleStartDraw
  // 设置结束绘画
  window.stopDraw = fnHandleEndDraw
  // 设置中心点
  window.setCenterPosition = fnSetMapCenterPosition
  // 设置地图类型 海图
  window.setMapType = fnSetMapType
  // 绘制duobiaxing
  window.showMarkedSurface = fnShowMarkedSurface
  // 更新面
  window.refresh = fnHandleClearMap //fnNetMarkList  fnHandleClearMap
})
</script>

<style>
.about {
  width: 100vw;
  height: 100vh;
  background-color: bisque;
}

.button-list {
  position: fixed;
  top: 30px;
  display: flex;

  button {
    width: auto;
  }
}

.content {
  width: 100vw;
  height: 100vh;
  background-color: rgb(26, 78, 31);
}

button {
  width: 50%;
  height: 60rpx;
  font-size: 24rpx;
}

iframe {
  width: 100vw;
  /* height: calc(100vh - 30px); */
  height: 100vh;
}
</style>
