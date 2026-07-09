## Why

本项目是一个全新的 Vue 3 + TypeScript Vite 工程，目前只有基础脚手架（router / request / App.vue），尚无任何业务代码。

需要新增一个「联系人列表」页面，作为项目的第一个业务模块，用于展示联系人卡片网格、支持分页与关键词搜索。这是项目的起步功能，也将为后续业务模块（如联系人详情、编辑等）奠定目录结构与代码规范基础。

UI 设计稿来源于 Figma，接口定义来源于 Apifox（唯一数据源）。

## What Changes

- 新增 `views/Contacts/index.vue` 联系人列表页面，包含标题区、搜索框、视图切换（Grid/List）、卡片网格、分页
- 新增业务组件 `ContactCard.vue`（卡片）、`ContactListTable.vue`（列表视图）、`SearchBar.vue`（搜索框）、`TeamBadge.vue`（团队徽章）
- 新增 `http/contact.ts` 接口封装（基于 Apifox `GET /api/list`）
- 新增 `interfaces/contact/` 类型定义（api.ts / model.ts）
- 新增 `stores/contact.ts` Pinia Store，管理列表/分页/搜索/视图模式状态
- 新增路由 `/contacts`
- **BREAKING**：修改 `src/utils/request.ts` 响应拦截器，由返回 `response.data`（`{code,msg,data}`）改为返回 `response.data.data`（业务数据本体），统一全站接口取数方式
- "New Contact" 按钮与卡片右上角"更多"图标本期保留可点击占位，点击弹出 `ElMessage` 提示"功能开发中"

## Capabilities

### New Capabilities

- `contacts-list`: 联系人列表展示能力，包含分页浏览、关键词搜索、Grid/List 双视图切换、团队徽章渲染

### Modified Capabilities

（无，本项目尚无已有 spec）

## Impact

**新增代码**：
- `src/views/Contacts/`（页面、组件、composables、constants、types）
- `src/http/contact.ts`
- `src/interfaces/contact/{api.ts, model.ts}`
- `src/stores/contact.ts`

**修改代码**：
- `src/utils/request.ts`（响应拦截器取数方式变更，全站影响）
- `src/router/index.ts`（新增 `/contacts` 路由）

**依赖的 API**：
- `GET /api/list`（Apifox 已定义）—— 支持分页（page / pageSize）与关键词搜索（keyword）

**依赖的 UI 设计**：
- Figma 设计稿 `(FREE) Contact Page Admin Dashboard (Community)`，node `0:17`

**风险与兼容性**：
- 响应拦截器改动影响全局，需确保改动后所有新接口遵循新约定（当前无其它业务接口，风险可控）
- List 视图在 Figma 设计稿中未提供，需前端自行设计行布局，存在设计还原度风险
- 团队徽章颜色采用纯前端色表，`Hs` 团队色值在设计稿中未出现，需自定义兜底色值
