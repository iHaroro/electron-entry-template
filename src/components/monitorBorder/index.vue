<template>
  <div class="monitor-border">
    <div class="border-item border-left-top"></div>
    <div class="border-item border-right-top"></div>
    <div class="border-item border-right-bottom"></div>
    <div class="border-item border-left-bottom"></div>
    <div class="monitor-border-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'monitorBorder' })
</script>

<style lang="scss" scoped>
.monitor-border {
  position: relative;

  .border-item {
    $border: -4;
    $width: 20;
    $height: 15;
    z-index: 1;
    position: absolute;
    width: vw($width);
    height: vh($height);
    background-color: #3773ff;

    &.border-left-top {
      top: vh($border);
      left: vw($border);
    }

    &.border-right-top {
      top: vh($border);
      right: vw($border);
    }

    &.border-right-bottom {
      right: vw($border);
      bottom: vh($border);
    }

    &.border-left-bottom {
      bottom: vh($border);
      left: vw($border);
    }
  }

  .monitor-border-content {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
