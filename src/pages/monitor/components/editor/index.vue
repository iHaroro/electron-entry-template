<template>
  <div class="editor-box">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { BUCKET_NAME_MAP, getUploadUrl, getDownloadUrl } from '@/pages/monitor/utils/minioConfig.js'

defineOptions({ name: 'EditorComponent' })

const emits = defineEmits([
  'created',
  'change',
  'destroyed',
  'focus',
  'blur',
  'customAlert',
  'customPaste'
])

const props = defineProps({
  value: { // 绑定 v-model ，必须
    type: String,
    default: ''
  },
  mode: { // 编辑器模式，默认 'default' ，可选 'simple'
    type: String,
    default: 'default'
  },
  placeholder: { // 编辑器 placeholder
    type: String,
    default: '请输入内容'
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 工具栏配置
const toolbarConfig = {}

// 编辑器配置
const maxFileSizeInMB = 20 * 1024 * 1024; // 20MB
const editorConfig = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      timeout: 15 * 1000,
      maxFileSize: maxFileSizeInMB,
      base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
      async customUpload(file, insertFn) {
        if (file.size > maxFileSizeInMB) {
          message.warn(`图片大小不能超过 ${maxFileSizeInMB / (1024 * 1024)} MB`)
          return
        }

        console.log('自定义上传图片', file)
        const formData = new FormData()
        formData.append("file", file)
        const result = await axios.post(getUploadUrl(BUCKET_NAME_MAP.CONFIG_FILE), formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (result.data.code === '200') {
          const { id } = result.data.data
          const url = getDownloadUrl(id)
          // 最后插入图片
          insertFn(url)
        } else {
          message.error('图片上传失败')
        }
      }
    },
    uploadVideo: {
      maxFileSize: maxFileSizeInMB,
      async customUpload(file, insertFn) {
        console.log('自定义上传视频', file)
        if (file.size > maxFileSizeInMB) {
          message.warn(`视频大小不能超过 ${maxFileSizeInMB / (1024 * 1024)} MB`)
          return
        }

        const formData = new FormData()
        formData.append("file", file)
        const result = await axios.post(getUploadUrl(BUCKET_NAME_MAP.CONFIG_FILE), formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (result.data.code === '200') {
          const { id } = result.data.data
          const url = getDownloadUrl(id)
          // 最后插入视频
          insertFn(url, '')
        } else {
          message.error('视频上传失败')
        }
      }
    }
  }
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  emits('created', { editor })
}

const handleChange = (editor) => {
  console.log('编辑器内容变化', editor)
  emits('change', { editor, value: editor.getHtml() })
}

const handleDestroyed = (editor) => {
  console.log('编辑器销毁', editor)
  emits('destroyed', { editor })
}

const handleFocus = (editor) => {
  emits('focus', { editor })
}

const handleBlur = (editor) => {
  emits('blur', { editor })
}

const customAlert = (info, type) => {
  emits('customAlert', { info, type })
}

const customPaste = (editor, event, callback) => {
  emits('customPaste', { editor, event, callback })
}

const destroyEditor = () => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
}

watch(
  () => props.value,
  newValue => {
    const editor = editorRef.value
    console.log('value change', editor, newValue)
    editor.setHtml(newValue)
  }
)

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  destroyEditor()
})
</script>

<style scoped lang="scss">
.editor-box {
  overflow: hidden;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
