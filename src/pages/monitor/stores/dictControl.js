import { ref } from 'vue'
import { getDict } from '@/pages/monitor/api/public.js'

export const useDictControl = () => {
  const dictionaryMap = ref({})

  /**
   * @function getDictionaryAction
   * @description 获取字典
   * @param {array} keys 字典的key集合,['dict_type_name', ...]
   **/
  const getDictionaryAction = async (keys) => {
    // 过滤掉已经存在的字典，如果某字典已经存在，不在请求该字典字段
    keys = keys.filter((key) => !dictionaryMap.value[key])
    if (keys.length !== 0) {
      await getDict({ type: keys }).then((res) => {
        if (res.code === '200') {
          for (const key of keys) {
            dictionaryMap.value[key] = res.data[key]
          }
        }
      })
      return dictionaryMap.value
    }
  }

  return {
    dictionaryMap,
    getDictionaryAction
  }
}
