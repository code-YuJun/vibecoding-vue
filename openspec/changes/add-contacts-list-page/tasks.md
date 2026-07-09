## 1. 基础设施：拦截器与类型定义

- [x] 1.1 修改 `src/utils/request.ts`，响应拦截器由 `return response.data` 改为 `return response.data.data`（参考 spec: Axios 响应拦截器统一返回 data 字段）
- [x] 1.2 新增 `src/interfaces/contact/model.ts`，定义 `Contact` 与 `Pagination` 业务模型类型（字段来源于 Apifox：id/avatar/fullName/position/company/phone/email/teamCode/teamColor）
- [x] 1.3 新增 `src/interfaces/contact/api.ts`，定义 `GetContactListParams`（page/pageSize/keyword）与 `GetContactListResponse`（pagination/list）类型
- [x] 1.4 新增 `src/http/contact.ts`，封装 `getContactList(params)` 函数，基于项目 request 实例调用 `GET /api/list`

## 2. 状态管理：Pinia Store

- [x] 2.1 新增 `src/stores/contact.ts`，定义 state：list / pagination / loading / page / pageSize / keyword / viewMode
- [x] 2.2 实现 `fetchList()` action，调用 `getContactList` 并更新 state
- [x] 2.3 实现 `setPage(page)` / `setKeyword(keyword)` / `setViewMode(mode)` actions，搜索时自动重置 page=1
- [x] 2.4 在 `fetchList` 中接入 lodash-es `debounce`（300ms）处理搜索防抖

## 3. 路由配置

- [x] 3.1 修改 `src/router/index.ts`，新增 `/contacts` 路由（懒加载 `@/views/Contacts/index.vue`）
- [x] 3.2 新增根路径 `/` 重定向到 `/contacts`

## 4. 页面私有常量与类型

- [x] 4.1 新增 `src/views/Contacts/constants.ts`，定义 `TEAM_COLOR_MAP`（Hs→#6418C3、Av→#266FC7、Cz→#DC3472、兜底#C2C2C2）
- [x] 4.2 新增 `src/views/Contacts/types.ts`，定义 `ViewMode` 类型（'grid' | 'list'）

## 5. 业务组件：TeamBadge

- [x] 5.1 新增 `src/views/Contacts/components/TeamBadge.vue`，接收 `teamCode` prop
- [x] 5.2 根据 teamCode 从 TEAM_COLOR_MAP 取色值渲染徽章（42×42，圆角 12px），未知 code 兜底灰色+首字母大写（参考 spec: 团队徽章按 teamCode 渲染颜色）

## 6. 业务组件：SearchBar

- [x] 6.1 新增 `src/views/Contacts/components/SearchBar.vue`，基于 el-input + 搜索图标
- [x] 6.2 实现 300ms 防抖，通过 emit `update:keyword` 通知父组件（参考 spec: 关键词搜索联系人）

## 7. 业务组件：ContactCard

- [x] 7.1 新增 `src/views/Contacts/components/ContactCard.vue`，接收 `contact: Contact` prop
- [x] 7.2 还原 Figma 卡片布局：白底卡片（276×359，圆角 14px，Shadow01 阴影）
- [x] 7.3 渲染头像（el-avatar，105×105，圆角 26px），avatar 为空时显示姓名首字母占位（参考 spec: 头像为空时显示占位）
- [x] 7.4 渲染姓名（Cairo Bold 18px，#202020）、职位@公司（公司名紫色 #6418C3 加粗）
- [x] 7.5 渲染电话（图标+文字）、邮箱（图标+文字）
- [x] 7.6 渲染右下角 TeamBadge 组件
- [x] 7.7 渲染右上角"更多"图标，点击弹出 ElMessage "功能开发中"（参考 spec: 点击卡片更多图标）

## 8. 业务组件：ContactListTable

- [x] 8.1 新增 `src/views/Contacts/components/ContactListTable.vue`，基于 el-table 渲染列表视图
- [x] 8.2 定义列：头像 / 姓名 / 职位 / 公司 / 联系方式（电话+邮箱）/ 团队徽章
- [x] 8.3 复用 ContactCard 的字段渲染逻辑与 TeamBadge 组件

## 9. 业务组件：Toolbar

- [x] 9.1 新增 `src/views/Contacts/components/Toolbar.vue`，包含标题区（"Contacts" + 副标题）
- [x] 9.2 集成 SearchBar 组件，双向绑定 keyword
- [x] 9.3 渲染 Grid / List 视图切换图标按钮，点击 emit `update:viewMode`
- [x] 9.4 渲染"New Contact"按钮（紫色 #6418C3，圆角 14px），点击弹出 ElMessage "功能开发中"（参考 spec: 点击 New Contact 按钮）

## 10. 页面组装

- [x] 10.1 新增 `src/views/Contacts/index.vue`，组装 Toolbar + 卡片网格/表格 + 分页
- [x] 10.2 根据 viewMode 切换渲染 ContactCard 网格（每行 5 张，flex 布局）或 ContactListTable
- [x] 10.3 接入 store，onMounted 触发 `fetchList()`，订阅 list/pagination/loading 渲染
- [x] 10.4 实现底部分页（参考 Figma：显示"Showing X-Y from {total} data" + 页码按钮），页码切换调用 `setPage` 后 `fetchList`
- [x] 10.5 实现 loading 态（v-loading 指令或骨架屏）

## 11. 验证与收尾

- [x] 11.1 运行 `npm run build` 确保构建通过
- [x] 11.2 运行 TypeScript 类型检查（`vue-tsc`）确保无类型错误
- [x] 11.3 启动 dev server 验证页面交互：分页、搜索防抖、视图切换、占位按钮提示
- [x] 11.4 检查响应拦截器改动未引入回归（dev server 网络请求正常返回业务数据）
