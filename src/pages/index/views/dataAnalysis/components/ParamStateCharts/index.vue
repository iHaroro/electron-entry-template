<template>
  <div class="params-state-charts-box">
    <div class="form-box">
      <!--<a-form layout="inline">-->
      <!--  <a-form-item>-->
      <!--    <a-select-->
      <!--      v-model:value="value"-->
      <!--      placeholder="custom dropdown render"-->
      <!--      style="width: 300px"-->
      <!--      :options="itemOptions"-->
      <!--    >-->
      <!--      <template #dropdownRender="{ menuNode: menu }">-->
      <!--        {{ menu }}-->
      <!--      </template>-->
      <!--    </a-select>-->
      <!--  </a-form-item>-->
      <!--</a-form>-->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
defineOptions({ name: 'ParamStateCharts' })

const value = ref(1)
const items = ref([
  { id: 1, name: '参数一' },
  { id: 2, name: '参数二' },
  { id: 3, name: '参数三' }
])

const itemOptions = computed(() => {
  return items.value.map(item => ({ value: item.id, label: item.name }))
})
</script>

<style scoped lang="scss">

</style>