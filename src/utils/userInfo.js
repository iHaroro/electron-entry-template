const TOKEN_KEY = 'token'
const CONFIG_KEY = 'config'

/**
 * @function getTokenFormApplication
 * @description 从应用中获取token
 * @returns {string} token
 **/
export const getTokenFormApplication = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

/**
 * @function setTokenToApplication
 * @description 将token设置到本地
 * @param {string} token
 **/
export const setTokenToApplication = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

/**
 * @function cleanTokenFromApplication
 * @description 清空token
 **/
export const cleanTokenFromApplication = () => {
  return localStorage.removeItem(TOKEN_KEY)
}

/**
 * @function getConfigFromApplication
 * @description 从应用中获取config
 * @returns {object} config
 **/
export const getConfigFromApplication = () => {
  return localStorage.getItem(CONFIG_KEY) || ''
}

/**
 * @function setConfigToApplication
 * @description 将config设置到本地
 * @param {string} config
 * @returns {object} config
 **/
export const setConfigToApplication = (config) => {
  return localStorage.setItem(CONFIG_KEY, config)
}
