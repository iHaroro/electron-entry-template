import { desktopCapturer, session } from 'electron'

export const getDesktopSource = () => {
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // 授予对找到的第一个屏幕的访问权限。
      callback({
        video: sources[0],
        audio: 'loopback'
      })
    })
    
  }, { useSystemPicker: true })
}