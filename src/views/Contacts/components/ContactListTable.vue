<script setup lang="ts">
import type { Contact } from '@/interfaces/contact/model'
import TeamBadge from './TeamBadge.vue'

defineProps<{
  list: Contact[]
}>()
</script>

<template>
  <el-table :data="list" style="width: 100%" stripe>
    <el-table-column label="头像" width="80">
      <template #default="{ row }">
        <el-avatar
          v-if="row.avatar"
          :src="row.avatar"
          :size="40"
          shape="square"
        />
        <el-avatar v-else :size="40" shape="square">
          {{ row.fullName?.charAt(0)?.toUpperCase() || '?' }}
        </el-avatar>
      </template>
    </el-table-column>

    <el-table-column prop="fullName" label="姓名" min-width="120" />

    <el-table-column prop="position" label="职位" min-width="140" />

    <el-table-column label="公司" min-width="140">
      <template #default="{ row }">
        <span style="color: #6418c3; font-weight: 600">{{ row.company }}</span>
      </template>
    </el-table-column>

    <el-table-column label="联系方式" min-width="240">
      <template #default="{ row }">
        <div style="display: flex; flex-direction: column; gap: 4px">
          <span>{{ row.phone }}</span>
          <span style="color: #a5a5a5">{{ row.email }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="团队" width="80" align="center">
      <template #default="{ row }">
        <TeamBadge :team-code="row.teamCode" />
      </template>
    </el-table-column>
  </el-table>
</template>
