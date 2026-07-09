<script setup lang="ts">
import { TEAM_COLOR_MAP, TEAM_BADGE_FALLBACK } from '../constants'

const props = defineProps<{
  teamCode: string
}>()

const badgeStyle = computed(() => {
  const entry = TEAM_COLOR_MAP[props.teamCode]
  if (entry) {
    return { backgroundColor: entry.color, color: '#FFFFFF' }
  }
  return { backgroundColor: TEAM_BADGE_FALLBACK.color, color: '#FFFFFF' }
})

const badgeText = computed(() => {
  const entry = TEAM_COLOR_MAP[props.teamCode]
  if (entry) {
    return entry.text
  }
  return props.teamCode ? props.teamCode.charAt(0).toUpperCase() : ''
})
</script>

<template>
  <div class="team-badge" :style="badgeStyle">
    {{ badgeText }}
  </div>
</template>

<style scoped lang="scss">
.team-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 14px;
  line-height: 1;
}
</style>
