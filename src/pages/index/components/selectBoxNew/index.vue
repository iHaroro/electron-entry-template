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
  padding: 0 vw(45) 0 vw(13);
  min-width: vw(244);
  height: vh(44);
  //line-height: 1;
  //border-radius: 50px;
  //border: 1px solid #64f2ff;
  //background: #020c30;
  font-size: vh(20);
  color: rgba(221, 240, 246, 1);
  cursor: pointer;
  background-image: url('../../assets/images/select_box_bg.png');
  background-size: 100% 100%;

  &.select-show {
    &::after {
      transform: translateY(-50%) rotate(180deg);
      background-image: url('../../assets/images/select_box_down.png');
    }
  }

  &.select-hide {
    &::after {
      transform: translateY(-50%) rotate(0);
      background-image: url('../../assets/images/select_box_down.png');
    }
  }

  &.active {
    color: rgba(255, 255, 255, 1);

    .select-current-name {
      letter-spacing: vw(2);
      color: rgba(255, 255, 255, 1);
    }

    &.select-show {
      &::after {
        background-image: url('../../assets/images/select_box_down.png');
      }
    }

    &.select-hide {
      &::after {
        background-image: url('../../assets/images/select_box_down.png');
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: vw(25);
    display: flex;
    width: vw(20);
    height: vw(20);
    transform: translateY(-50%);
    transition: all 0.18s linear;
    background-image: url('../../assets/images/select_down_icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  .select-current-name {
    width: 100%;
    margin-bottom: vh(3);
    font-weight: 400;
    font-size: vh(20);
    color: rgba(255, 255, 255, 0.65);
    text-align: left;
    user-select: none;
    word-break: break-all;
  }

  .select-item-box {
    z-index: 999999;
    position: absolute;
    top: vh(44);
    left: 50%;
    transform: translateX(-50%);
    width: vw(232);
    background: rgba(11, 45, 90, 1);

    .select-item {
      display: flex;
      align-items: center;
      height: vh(42);
      font-weight: 400;
      font-size: vh(20);
      color: rgba(217, 236, 242, 1);
      padding: 0 vw(20);
      text-align: left;
      word-break: break-all;
      border-bottom: 1px solid rgba(14, 52, 109, 1);

      &:hover {
        //color: #64f2ff;
        background-image: url('../../assets/images/select_box_active_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
