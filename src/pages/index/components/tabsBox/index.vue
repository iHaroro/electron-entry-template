<template>
  <div class="tabs-box">
    <div
      v-for="(item, index) in options"
      :key="`tab_item_${index}_${item[optionsProps.key]}`"
      class="tab-item"
      :class="{
        active: value === item[optionsProps.value],
      }"
      @click.stop="toggleTabBox(item[optionsProps.value])"
    >
      {{ item[optionsProps.name] }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
defineOptions({ name: 'TabsBox' })
const defaultOptionProps = { name: 'name', value: 'value', key: 'value' }

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  optionsProps: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['value', 'change'])
const optionsProps = ref({ ...defaultOptionProps, ...props.optionsProps })

const value = defineModel('value', { required: true, default: [String, Number] })
const toggleTabBox = (val) => {
  emit('update:value', val)
}

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('change', newVal)
  }
})
</script>

<style scoped lang="scss">
.tabs-box {
  display: flex;
  align-items: center;
  height: vh(33);
  background: rgba(0, 114, 255, 0.4);
  border-radius: vh(36);

  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: vh(33);
    padding: 0 vw(27);
    cursor: pointer;

    &.active {
      background: #0072ff;
      border-radius: vh(36);
    }
  }
}
</style>
