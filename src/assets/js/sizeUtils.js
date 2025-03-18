// 定义设计稿的宽高（修改同步修改sizeUtils.scss）
const designWidth = 1920
const designHeight = 1080

// px转vw
export const px2vw = (_px) => {
  return (_px * 100.0) / designWidth + 'vw'
}

export const px2vh = (_px) => {
  return (_px * 100.0) / designHeight + 'vh'
}

export const px2font = (_px) => {
  return (_px * 100.0) / designWidth + 'vw'
}
