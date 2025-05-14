import electronDevtoolsInstaller, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

/**
 * @function initVueDevTools
 * @description 初始化vueDevTools
 **/
export const initVueDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      electronDevtoolsInstaller(VUEJS_DEVTOOLS)
      .then((name) => console.log(`installed: ${name}`))
      .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
}