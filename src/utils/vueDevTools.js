import electronDevtoolsInstaller, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

/**
 * @function initVueDevTools
 * @description 初始化vueDevTools
 **/
export const initVueDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      electronDevtoolsInstaller(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Vue DevTools installed: ${name}`))
      .catch(err => console.log('Unable to install `Vue DevTools`: \n', err))
    } catch (e) {
      console.error("Vue DevTools failed to install:", e.toString());
    }
  }
}