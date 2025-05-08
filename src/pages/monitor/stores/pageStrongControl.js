import { ref } from 'vue'

export const usePageStrongControl = () => {
  const sessionStoreKey = 'pageStrongStore'
  const getSessionStore = () => JSON.parse(sessionStorage.getItem(sessionStoreKey) || '{}')

  let pageStrongStore = ref(getSessionStore())

  /**
   * @function setPageStrongStore
   * @description 设置页面数据
   * @param {string} pathName 页面路径名
   * @param {string} key 数据键名
   * @param {object} data 页面数据
   **/
  const setPageStrongStore = (pathName, key, data) => {
    if (!pageStrongStore.value[pathName]) {
      pageStrongStore.value[pathName] = {}
    }
    pageStrongStore.value[pathName][key] = data
    sessionStorage.setItem(sessionStoreKey, JSON.stringify(pageStrongStore.value))
  }

  /**
   * @function getPageStrongStore
   * @description 获取页面数据
   * @param {string} pathName 页面路径名
   * @param {string} key 数据键名
   * @returns {any} 数据
   **/
  const getPageStrongStore = (pathName, key) => {
    return pageStrongStore.value[pathName][key]
  }

  /**
   * @function deletePageStrongStore
   * @description 删除页面数据
   * @param {string} pathName 页面路径名 不传删除所有页面数据
   * @param {string} key 数据键名 不传删除该页面所有数据
   **/
  const deletePageStrongStore = (pathName = '', key = '') => {
    if (!pathName && !key) {
      pageStrongStore.value = {}
    } else if (pathName && !key) {
      pageStrongStore.value[pathName] = null
    } else if (pathName && key) {
      pageStrongStore.value[pathName][key] = null
    }
  }

  return {
    pageStrongStore,
    setPageStrongStore,
    getPageStrongStore,
    deletePageStrongStore
  }
}
