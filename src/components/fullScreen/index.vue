<template>
  <div class="full-screen-box">
    <button v-if="isFullScreen" class="exit-fullscreen-btn" @click="exitFullscreen"></button>
    <button v-else class="fullscreen-btn" @click="screen"></button>
  </div>
</template>
<script>
import { getUrlKey } from '@/utils/utils.js'
export default {
  name: 'FullScreen',
  data() {
    return {
      isFullScreen: true,
    }
  },
  mounted() {
    this.initFullscreen()
    this.screenFull()
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.KeyDown)
    document.removeEventListener('fullscreenchange', this.initFullscreen)
    document.removeEventListener('mozfullscreenchange', this.initFullscreen)
    document.removeEventListener('webkitfullscreenchange', this.initFullscreen)
    document.removeEventListener('msfullscreenchange', this.initFullscreen)
  },
  methods: {
    // 监听Esc事件；
    screenFull() {
      // 监听f11事件
      window.addEventListener('keydown', this.KeyDown, true)
      document.addEventListener('fullscreenchange', this.initFullscreen)
      document.addEventListener('mozfullscreenchange', this.initFullscreen)
      document.addEventListener('webkitfullscreenchange', this.initFullscreen)
      document.addEventListener('msfullscreenchange', this.initFullscreen)
    },
    KeyDown(event) {
      if (event.keyCode === 122) {
        event.returnValue = false
        this.isScreenFull() // 触发全屏的方法
      }
    },
    // 全屏方法
    isScreenFull() {
      if (document.fullscreenElement) {
        this.exitFullscreen()
      } else {
        this.screen()
      }
    },
    screen() {
      var requestFullScreen = (element) => {
        var requestMethod =
          element.requestFullscreen || // W3C
          element.webkitRequestFullscreen || // Chrome
          element.mozRequestFullScreen || // FireFox
          element.msRequestFullscreen // IE11
        if (requestMethod) {
          requestMethod.call(element)
        } else if (typeof window.ActiveXObject !== 'undefined') {
          // for Internet Explorer
          // eslint-disable-next-line no-undef
          var wscript = new ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{F11}')
          }
        }
      }
      if (
        window.parent &&
        window.parent.full_screen &&
        ((this.need_full_screen && this.need_full_screen == 1) ||
          getUrlKey('need_full_screen') == 1)
      ) {
        window.parent.full_screen()
      } else {
        requestFullScreen(document.documentElement) // 整个网页
      }
      this.isFullScreen = true
    },
    exitFullscreen() {
      if (
        window.parent &&
        window.parent.full_screen &&
        ((this.need_full_screen && this.need_full_screen == 1) ||
          getUrlKey('need_full_screen') == 1)
      ) {
        window.parent.full_screen()
      } else if (document.exitFullScreen) {
        // W3C
        document.exitFullScreen()
      }
      // FireFox
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      }
      // Chrome等
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      // IE11
      else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.isFullScreen = false
    },
    initFullscreen() {
      this.isFullScreen = !!document.fullscreenElement
    },
  },
}
</script>

<style scoped lang="scss">
.full-screen-box {
  z-index: 999;
}

.fullscreen-btn {
  width: vw(40);
  height: vh(40);
  background-image: url('@/assets/images/full_screen_icon.png');
  background-repeat: no-repeat;
  background-size: vw(34);
  background-position: center;
}

.exit-fullscreen-btn {
  width: vw(40);
  height: vh(40);
  background-image: url('@/assets/images/exit_full_screen_icon.png');
  background-repeat: no-repeat;
  background-size: vw(26);
  background-position: center;
}
</style>
