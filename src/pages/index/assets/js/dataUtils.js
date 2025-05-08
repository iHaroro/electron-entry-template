/**
 * @function fitChartSize
 * @description 转换图标的尺寸
 * @param {number} size 大小
 * @param {number} defaultWidth 默认宽度
 * @returns {any} 返回转换后的尺寸
 **/
export const fitChartSize = (size, defaultWidth = 1920) => {
  let clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return size
  let scale = clientWidth / defaultWidth
  return Number((size * scale).toFixed(3))
}
