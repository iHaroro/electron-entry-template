<template>
  <a-upload
    v-model:file-list="innerFileList"
    name="file"
    :multiple="multiple"
    :max-count="maxCount"
    :beforeUpload="beforeUpload"
    :customRequest="customRequest"
    @change="handlerChange"
    v-bind="$attrs"
  >
    <template v-if="slots.default">
      <slot />
    </template>
    <template v-else>
      <a-button :disabled="$attrs.disabled">
        <upload-outlined />
        {{ btnText }}
      </a-button>
    </template>
  </a-upload>
</template>

<script setup>
import { ref, useSlots, watch } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { getUploadUrl, getDownloadUrl, BUCKET_NAME_MAP } from '@/pages/monitor/utils/minioConfig.js'

defineOptions({ name: 'UploadComponent' })

// accept="image/png" 或 accept=".png"——接受 PNG 文件。
// accept="image/png, image/jpeg" 或 accept=".png, .jpg, .jpeg"——接受 PNG 或 JPEG 文件。
// accept="image/*"——接受任何带有 image/* MIME 类型的文件。（许多移动设备也允许用户在使用它时用摄像头拍照。）
// accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"——接受类似于 MS Word 文档的任何文件。

const slots = useSlots()
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  maxCount: {
    type: Number,
    default: 1
  },
  btnText: {
    type: String,
    default: '上传附件'
  },
  maxFileSize: {
    type: Number,
    default: 1024 * 1024 * 20
  },
  value: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['change'])

// 内部的 fileList，用于管理文件列表
const innerFileList = ref(props.value)

const handlerChange = ({ fileList }) => {
  console.log('fileList', fileList)
  emits('change', fileList)
}

// 监听内部 fileList 的变化，同步更新到父组件
watch(
  () => props.value,
  (newValue) => {
    console.log('fileList change', newValue)
    innerFileList.value = newValue
  },
  { deep: true }
)

/**
 * @description 上传前的文件校验
 * @param {File} file 上传的文件
 * @param {Array} fileList 当前的文件列表
 * @returns {boolean|File} 如果文件符合要求返回文件本身，否则返回 false
 */
const beforeUpload = (file, fileList) => {
  // 校验文件数量
  if (props.multiple && fileList.length >= props.maxCount) {
    message.error(`最多只能上传 ${props.maxCount} 个文件`)
    return false
  }
  if (!props.multiple && fileList.length > 0) {
    message.error('只能上传一个文件')
    return false
  }
  // 校验文件大小
  if (file.size > props.maxFileSize) {
    message.error(`文件大小不能超过 ${props.maxFileSize / (1024 * 1024)} MB`)
    return false
  }
  return file
}
/**
 * @description 自定义上传请求
 * @param {object} options 上传配置项
 * @param {function} options.onProgress 上传进度回调
 * @param {function} options.onError 上传错误回调
 * @param {function} options.onSuccess 上传成功回调
 * @param {File} options.file 上传的文件
 */
const customRequest = async ({ onProgress, onError, onSuccess, file }) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await axios.post(getUploadUrl(BUCKET_NAME_MAP.CONFIG_FILE), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress({ percent })
      }
    })

    if (result.data.code === '200') {
      const { id } = result.data.data
      const url = getDownloadUrl(id)
      onSuccess({ ...result.data.data, fileUrl: url }, file)
    } else {
      message.error('文件上传失败（网络问题）')
      onError(new Error('文件上传失败（网络问题）'))
    }
  } catch (error) {
    message.error('文件上传失败')
    onError(error)
  }
}
</script>
