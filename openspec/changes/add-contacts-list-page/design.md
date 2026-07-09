## Context

本项目是一个全新的 Vue 3 + TypeScript Vite 工程，仅含基础脚手架（router 空路由、request 基础 axios、App.vue 仅 router-view），无任何业务代码。本变更将新增「联系人列表」作为首个业务模块，奠定目录结构与代码规范。

数据来源：
- API：Apifox `GET /api/list`（支持 page / pageSize / keyword）
- UI：Figma `(FREE) Contact Page Admin Dashboard (Community)` node `0:17`

当前 `src/utils/request.ts` 响应拦截器返回 `response.data`（即 `{code,msg,data}` 整体），业务层每次需 `res.data.xxx` 解构，本期将统一改为返回 `response.data.data`。

## Goals / Non-Goals

**Goals:**
- 实现联系人列表页面，支持卡片网格视图（Grid）与列表视图（List）切换
- 支持分页浏览（page / pageSize）与关键词搜索（keyword）
- 按团队标识（teamCode）渲染彩色徽章
- 复用 Element Plus 组件，遵循项目目录结构与编码规范
- 统一 Axios 响应拦截器取数方式

**Non-Goals:**
- 不实现联系人新增/编辑/删除接口（按钮保留可点击占位）
- 不实现联系人详情页
- 不做权限控制 / 路由守卫
- 不做单元测试（遵循项目测试规范，本期以类型检查 + 构建通过为准）
- 不对 List 视图做 Figma 还原（设计稿未提供，前端自行设计）

## Decisions

### 1. 响应拦截器改为返回 data 字段

**决策**：修改 `src/utils/request.ts`，响应拦截器由 `return response.data` 改为 `return response.data.data`。

**理由**：业务层直接拿到业务数据本体（如 `{pagination, list}`），无需每个接口重复解构 `{code,msg,data}`。

**替代方案**：保持现状，业务层手动解构。否决原因：每个接口都要写 `res.data.xxx`，重复且易错。

**影响**：BREAKING，全站接口取数方式变更。当前无其它业务接口，风险可控。

### 2. Grid + List 双视图切换

**决策**：两种视图都实现。
- Grid：卡片网格（每行 5 张，设计稿还原）
- List：表格行布局（`el-table` 实现，列：头像/姓名/职位/公司/联系方式/团队）

**理由**：设计稿顶部明确有 grid/list 两个切换图标，缺失任一都会影响交互完整性。

**替代方案**：仅做 Grid。否决原因：List 切换按钮无响应影响体验。

### 3. 增删改按钮保留可点击占位

**决策**："New Contact" 按钮与卡片右上角"更多"图标均保留可点击，点击弹出 `ElMessage` 提示"功能开发中"。

**理由**：保持 UI 完整性与交互真实感，后续接入接口时只需替换回调。

### 4. 团队徽章采用纯前端色表

**决策**：前端按 `teamCode` 维护固定色表，忽略后端 `teamColor` 字段。

**色表**：
| teamCode | 色值 | 显示文本 |
|----------|------|---------|
| `Hs` | `#6418C3`（主色紫） | "Hs" |
| `Av` | `#266FC7`（蓝） | "AV" |
| `Cz` | `#DC3472`（粉） | "Cz" |
| 其它/空 | `#C2C2C2`（Grey-02） | 取首字母大写 |

**理由**：统一可控，不依赖后端是否返回 teamColor。`Hs` 在设计稿未出现，使用主色紫兜底。

**替代方案**：后端为主 + 前端兜底。否决原因：色值来源不统一，可能出现徽章颜色不一致。

### 5. 头像 fallback 策略

**决策**：`avatar` 为空字符串或加载失败时，使用 `el-avatar` 显示姓名首字母（取 `fullName` 首字母大写）。

### 6. 组件结构与目录组织

```
src/views/Contacts/
├── index.vue                       # 页面入口：标题区 + 工具栏 + 卡片网格/表格 + 分页
├── components/
│   ├── ContactCard.vue             # Grid 视图单卡片（276×359 设计还原）
│   ├── ContactListTable.vue        # List 视图表格（el-table）
│   ├── SearchBar.vue               # 搜索框（el-input + 图标 + 防抖）
│   ├── Toolbar.vue                 # 工具栏容器（搜索 + 视图切换 + New Contact）
│   └── TeamBadge.vue               # 团队彩色徽章
├── composables/
│   └── useContacts.ts              # 列表请求/分页/搜索逻辑（可选，按 store 边界决定）
├── constants.ts                    # TEAM_COLOR_MAP、VIEW_MODE 等
└── types.ts                        # ViewMode 等页面私有类型
```

### 7. 数据流

```
┌───────────────┐  fetchList(page,pageSize,keyword)  ┌──────────────┐
│ Contacts      │ ─────────────────────────────────▶ │ stores/      │
│ index.vue     │                                     │ contact.ts  │
│ (subscribe)   │ ◀───────────────────────────────── │              │
└───────┬───────┘   list / pagination / loading      └──────┬───────┘
        │                                                │ getContactList()
        │ props: contact                                 │
        ▼                                                ▼
┌───────────────┐                                  ┌──────────────┐
│ ContactCard   │                                  │ http/        │
│ .vue          │                                  │ contact.ts   │
└───────────────┘                                  └──────────────┘
```

### 8. Pinia Store 设计

`stores/contact.ts`：
- **state**：`list: Contact[]`、`pagination: Pagination`、`loading: boolean`、`page: number`、`pageSize: number`、`keyword: string`、`viewMode: 'grid' | 'list'`
- **actions**：`fetchList()`、`setPage(page)`、`setKeyword(keyword)`、`setViewMode(mode)`
- 搜索使用防抖（lodash-es `debounce`，300ms）

### 9. 路由变更

`src/router/index.ts` 新增：
- path: `/contacts`
- name: `Contacts`
- component: `() => import('@/views/Contacts/index.vue')`
- redirect: `/` → `/contacts`（作为默认首页）

## Risks / Trade-offs

- **[响应拦截器改动全局影响]** → 当前无其它业务接口，改动后立即全站统一；后续所有新接口遵循新约定
- **[List 视图无设计稿]** → 采用 `el-table` 行布局，列设计参考卡片信息字段，保证信息完整性而非像素级还原
- **[Hs 团队色值未在设计稿出现]** → 使用主色紫 `#6418C3` 兜底，与整体色调一致
- **[搜索防抖与分页状态同步]** → 搜索时重置 page=1，分页时保留 keyword，由 store 统一管理状态切换
