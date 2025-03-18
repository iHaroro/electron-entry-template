<template>
  <div class="state-switcher-box" :class="checked ? 'checked' : 'un-checked'">
    <div class="text">{{ props.title }}</div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'stateSwitcher',
})

const checked = defineModel('checked', { type: Boolean, default: false })

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.state-switcher-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: vw(114);
  height: vh(24);
  border-radius: 100px;
  cursor: not-allowed;
  font-size: vh(14);
  transition: all 0.4s ease-in-out;

  &.checked {
    background: rgba(98, 173, 23, 1);

    .text {
      color: rgba(221, 240, 246, 1);
    }
  }

  &.un-checked {
    background: rgba(14, 86, 141, 0.54);

    .text {
      color: rgba(221, 240, 246, 0.4);
    }
  }
}
</style>
