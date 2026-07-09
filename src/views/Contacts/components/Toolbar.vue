<script setup lang="ts">
import { Plus, Grid, Menu } from '@element-plus/icons-vue'
import type { ViewMode } from '../types'
import SearchBar from './SearchBar.vue'

const props = defineProps<{
  keyword: string
  viewMode: ViewMode
}>()

const emit = defineEmits<{
  'update:keyword': [value: string]
  'update:viewMode': [value: ViewMode]
}>()

function handleNewContact() {
  ElMessage.info('功能开发中')
}

function switchView(mode: ViewMode) {
  emit('update:viewMode', mode)
}
</script>

<template>
  <div class="toolbar">
    <!-- 标题区 -->
    <div class="toolbar__title">
      <h1 class="toolbar__heading">Contacts</h1>
      <p class="toolbar__subtitle">Lorem ipsum dolor sit amet</p>
    </div>

    <!-- 工具区 -->
    <div class="toolbar__actions">
      <SearchBar
        :model-value="props.keyword"
        @update:model-value="(v: string) => emit('update:keyword', v)"
      />

      <!-- 视图切换 -->
      <div class="toolbar__view-toggle">
        <button
          class="toolbar__view-btn"
          :class="{ 'is-active': props.viewMode === 'list' }"
          @click="switchView('list')"
        >
          <el-icon :size="22"><Menu /></el-icon>
        </button>
        <button
          class="toolbar__view-btn"
          :class="{ 'is-active': props.viewMode === 'grid' }"
          @click="switchView('grid')"
        >
          <el-icon :size="22"><Grid /></el-icon>
        </button>
      </div>

      <!-- New Contact 按钮 -->
      <button class="toolbar__new-btn" @click="handleNewContact">
        <el-icon :size="24"><Plus /></el-icon>
        <span>New Contact</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;

  &__title {
    flex-shrink: 0;
  }

  &__heading {
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    font-size: 34px;
    color: #202020;
    margin: 0;
  }

  &__subtitle {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #a5a5a5;
    margin: 8px 0 0 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__view-toggle {
    display: flex;
    gap: 8px;
  }

  &__view-btn {
    width: 68px;
    height: 68px;
    border: none;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.04);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a5a5a5;
    transition: all 0.2s;

    &:hover {
      color: #6418c3;
    }

    &.is-active {
      background: #6418c3;
      color: #ffffff;
    }
  }

  &__new-btn {
    height: 68px;
    padding: 0 24px;
    border: none;
    border-radius: 14px;
    background: #6418c3;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.04);
    color: #ffffff;
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
