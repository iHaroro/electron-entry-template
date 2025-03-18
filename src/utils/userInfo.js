const TOKEN_KEY = 'token'

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
