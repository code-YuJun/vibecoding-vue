/** 团队标识到色值的映射（纯前端色表，忽略后端 teamColor） */
export const TEAM_COLOR_MAP: Record<string, { color: string; text: string }> = {
  Hs: { color: '#6418C3', text: 'Hs' },
  Av: { color: '#266FC7', text: 'AV' },
  Cz: { color: '#DC3472', text: 'Cz' },
}

/** 兜底色值（未知 teamCode） */
export const TEAM_BADGE_FALLBACK = {
  color: '#C2C2C2',
}

/** 默认分页大小 */
export const DEFAULT_PAGE_SIZE = 10

/** 搜索防抖延迟（ms） */
export const SEARCH_DEBOUNCE_DELAY = 300
