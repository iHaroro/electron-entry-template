<template>
  <img class="icon" :src="icon" :alt="alt" />
</template>

<script setup>
defineOptions({ name: 'RouteIcon' })

defineProps({
  icon: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'icon'
  }
})
</script>

<style scoped lang="scss">
.icon {
  width: 24px;
}
</style>