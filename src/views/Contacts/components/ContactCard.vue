<script setup lang="ts">
import { MoreFilled, Phone, Message } from '@element-plus/icons-vue'
import type { Contact } from '@/interfaces/contact/model'
import TeamBadge from './TeamBadge.vue'

const props = defineProps<{
  contact: Contact
}>()

/** 头像为空时显示姓名首字母 */
const avatarFallback = computed(() => {
  return props.contact.fullName?.charAt(0)?.toUpperCase() || '?'
})

/** 点击更多图标 */
function handleMore() {
  ElMessage.info('功能开发中')
}
</script>

<template>
  <div class="contact-card">
    <!-- 右上角更多图标 -->
    <el-icon class="contact-card__more" :size="18" @click="handleMore">
      <MoreFilled />
    </el-icon>

    <!-- 头像 -->
    <div class="contact-card__avatar">
      <el-avatar
        v-if="contact.avatar"
        :src="contact.avatar"
        :size="105"
        shape="square"
      />
      <el-avatar v-else :size="105" shape="square">
        {{ avatarFallback }}
      </el-avatar>
    </div>

    <!-- 姓名 -->
    <div class="contact-card__name">{{ contact.fullName }}</div>

    <!-- 职位 @ 公司 -->
    <div class="contact-card__position">
      {{ contact.position }} at
      <span class="contact-card__company">{{ contact.company }}</span>
    </div>

    <!-- 电话 -->
    <div class="contact-card__contact">
      <el-icon :size="18"><Phone /></el-icon>
      <span>{{ contact.phone }}</span>
    </div>

    <!-- 邮箱 -->
    <div class="contact-card__contact">
      <el-icon :size="18"><Message /></el-icon>
      <span>{{ contact.email }}</span>
    </div>

    <!-- 团队徽章 -->
    <div class="contact-card__badge">
      <TeamBadge :team-code="contact.teamCode" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-card {
  position: relative;
  width: 276px;
  height: 359px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.04);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  &__more {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: #a5a5a5;

    &:hover {
      color: #6418c3;
    }
  }

  &__avatar {
    margin-bottom: 20px;

    :deep(.el-avatar) {
      border-radius: 26px;
      background: #c4c4c4;
      font-family: 'Cairo', sans-serif;
      font-weight: 700;
      font-size: 36px;
      color: #ffffff;
    }
  }

  &__name {
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #202020;
    text-align: center;
    margin-bottom: 12px;
  }

  &__position {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #a5a5a5;
    text-align: center;
    margin-bottom: 24px;
    min-height: 40px;
  }

  &__company {
    font-weight: 600;
    color: #6418c3;
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-bottom: 8px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #202020;

    .el-icon {
      color: #a5a5a5;
      flex-shrink: 0;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__badge {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
