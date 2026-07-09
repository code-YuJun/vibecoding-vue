<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { debounce } from 'lodash-es'
import { SEARCH_DEBOUNCE_DELAY } from '../constants'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
  }
)

const emitKeyword = debounce((val: string) => {
  emit('update:modelValue', val)
}, SEARCH_DEBOUNCE_DELAY)

function onInput(val: string) {
  inputValue.value = val
  emitKeyword(val)
}
</script>

<template>
  <div class="search-bar">
    <el-input
      v-model="inputValue"
      placeholder="Search here"
      :prefix-icon="Search"
      size="large"
      @update:model-value="onInput"
    />
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  width: 491px;
  height: 68px;

  :deep(.el-input__wrapper) {
    height: 68px;
    border-radius: 14px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.04);
    padding: 0 20px 0 34px;
  }

  :deep(.el-input__inner) {
    font-family: 'Cairo', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #202020;

    &::placeholder {
      color: #aaaaaa;
    }
  }

  :deep(.el-input__prefix) {
    left: 20px;

    .el-icon {
      font-size: 28px;
      color: #a5a5a5;
    }
  }
}
</style>
