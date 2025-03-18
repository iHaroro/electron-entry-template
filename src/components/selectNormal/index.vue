<template>
  <div
    class="select-box"
    :class="{
      active: !!currentSelectData,
      'select-show': selectShow,
      'select-hide': !selectShow,
    }"
    :title="currentSelectName"
    @click.stop="toggleSelectBox()"
  >
    <p class="select-current-name text-overflow">{{ currentSelectName }}</p>

    <div class="select-item-box" v-show="selectShow">
      <div
        v-for="(item, index) in options"
        :key="`select_item_${index}_${item[optionsProps.key]}`"
        class="select-item text-overflow"
        :title="item[optionsProps.name]"
        @click.stop="choiceItem(item[optionsProps.value])"
      >
        {{ item[optionsProps.name] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
defineOptions({ name: 'SelectBox' })
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
const choiceItem = (val) => {
  emit('update:value', val)
  toggleSelectBox(false)
}

const selectShow = ref(false)
const toggleSelectBox = (flag = undefined) => {
  selectShow.value = [false, true].includes(flag) ? flag : !selectShow.value
}

const currentSelectData = computed(() => {
  return props.options.find((option) => option[optionsProps.value.value] === value.value)
})
const currentSelectName = computed(() => {
  return currentSelectData.value ? currentSelectData.value[optionsProps.value.name] : '请选择'
})

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    choiceItem(newVal)
    emit('change', newVal)
  }
})
</script>

<style scoped lang="scss">
.select-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 320px;
  height: 44px;
  padding: vh(11) vw(16);
  background: #0b2d5a;

  &.select-show {
    &::after {
      transform: rotate(180deg);
      background-image: url('@/assets/images/select_down_icon.png');
    }
  }

  &.select-hide {
    &::after {
      transform: rotate(0);
      background-image: url('@/assets/images/select_down_icon.png');
    }
  }

  &.active {
    color: rgba(255, 255, 255, 1);

    .select-current-name {
      color: rgba(255, 255, 255, 1);
    }

    &.select-show {
      &::after {
        background-image: url('@/assets/images/select_down_active_icon.png');
      }
    }

    &.select-hide {
      &::after {
        background-image: url('@/assets/images/select_down_active_icon.png');
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: vw(5);
    display: flex;
    width: vw(24);
    height: 100%;
    background-image: url('@/assets/images/select_down_icon.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .select-current-name {
    width: 100%;
    font-weight: 400;
    font-size: vh(18);
    color: rgba(255, 255, 255, 0.65);
    text-align: left;
    user-select: none;
    word-break: break-all;
  }

  .select-item-box {
    z-index: 999999;
    position: absolute;
    top: vh(28);
    left: 0;
    min-width: 100%;
    max-width: vw(250);
    padding: vh(10) vw(12);
    border-radius: 6px;
    border: 1px solid #64f2ff;
    background: #020c30;

    .select-item {
      height: vh(40);
      line-height: vh(40);
      text-align: left;
      color: #ffffff;
      word-break: break-all;

      &:hover {
        color: #64f2ff;
      }
    }
  }
}
</style>
