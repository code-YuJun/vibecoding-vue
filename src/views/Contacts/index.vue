<script setup lang="ts">
import { useContactStore } from '@/stores/contact'
import Toolbar from './components/Toolbar.vue'
import ContactCard from './components/ContactCard.vue'
import ContactListTable from './components/ContactListTable.vue'

const store = useContactStore()

onMounted(() => {
  store.fetchList()
})

/** 分页范围：起始 */
const rangeStart = computed(() => {
  if (store.list.length === 0) return 0
  return (store.page - 1) * store.pageSize + 1
})

/** 分页范围：结束 */
const rangeEnd = computed(() => {
  return Math.min(store.page * store.pageSize, store.pagination.total)
})
</script>

<template>
  <div class="contacts-page">
    <!-- 工具栏 -->
    <Toolbar
      :keyword="store.keyword"
      :view-mode="store.viewMode"
      @update:keyword="store.setKeyword"
      @update:view-mode="store.setViewMode"
    />

    <!-- 内容区 -->
    <div v-loading="store.loading" class="contacts-page__content">
      <!-- Grid 视图：卡片网格 -->
      <div v-if="store.viewMode === 'grid'" class="contacts-page__grid">
        <ContactCard
          v-for="contact in store.list"
          :key="contact.id"
          :contact="contact"
        />
      </div>

      <!-- List 视图：表格 -->
      <ContactListTable v-else :list="store.list" />
    </div>

    <!-- 分页 -->
    <div class="contacts-page__pagination">
      <span class="contacts-page__pagination-text">
        Showing {{ rangeStart }}-{{ rangeEnd }} from {{ store.pagination.total }} data
      </span>
      <el-pagination
        :current-page="store.page"
        :page-size="store.pageSize"
        :total="store.pagination.total"
        layout="prev, pager, next"
        @current-change="store.setPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contacts-page {
  max-width: 1476px;
  margin: 0 auto;
  padding: 40px 20px;

  &__content {
    min-height: 400px;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: flex-start;
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    padding-top: 20px;
  }

  &__pagination-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #000000;

    :deep(strong) {
      font-weight: 700;
    }
  }
}
</style>
