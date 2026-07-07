---
name: create-component
description: 创建或维护 Vue 组件。根据业务需求自动分析组件类型、复用已有组件，并按项目规范生成符合 Vue3 + TypeScript + Element Plus 的组件；必要时自动调用 create-api、create-store 等 Skill。
---
# 创建与维护 Vue 组件

## 使用场景

当需要：

- 新增页面
- 新增业务组件
- 新增公共组件
- 修改已有组件
- 根据 Figma 设计稿生成页面
- 拆分大型组件

请使用本技能。

同时遵循：

- `.agents/rules/04-组件规范.md`
- `.agents/rules/02-编码规范.md`

---

# 工作目标

本技能负责：

- 判断组件类型
- 判断组件目录
- 优先复用已有组件
- 自动拆分组件职责
- 自动生成 Props / Emits 类型
- 自动生成符合项目规范的 Vue3 组件

必要时：

- 调用 create-api
- 调用 create-store

---

# Workflow

## Step1：分析需求

首先分析当前需求属于：

① 页面（Page）

例如：

```
用户管理页面

实验详情页面

首页

登录页
```

放置：

```
src/views
```

---

② 业务组件（Business Component）

例如：

```
SearchForm

UserTable

CreateDialog

PermissionTree
```

放置：

```
当前页面/components
```

---

③ 公共组件（Common Component）

例如：

```
BaseTable

BaseDialog

IconSelect

UploadImage
```

放置：

```
src/components
```

---

## Step2：检查已有组件

生成前必须检查：

是否已有：

- 相同组件
- 相似组件
- 可复用组件

如果存在：

优先复用。

禁止重复创建。

---

## Step3：检查设计稿

如果当前项目已连接：

```
Figma MCP
```

且需求来源于设计稿：

优先读取设计稿。

根据设计稿：

- 分析页面结构
- 分析组件层级
- 分析布局
- 分析交互

禁止凭空猜测 UI。

---

## Step4：分析组件职责

组件仅负责：

- UI 展示
- 用户交互
- 页面组织

如果组件职责过多：

自动拆分。

例如：

```
UserPage
```

拆分：

```
SearchForm

UserTable

EditDialog
```

保持：

单一职责。

---

## Step5：分析数据来源

判断：

组件是否需要：

- HTTP 请求
- 全局状态

如果需要 HTTP：

调用：

```
create-api
```

Skill。

如果需要共享状态：

调用：

```
create-store
```

Skill。

禁止：

组件内直接：

```ts
axios.get(...)
```

---

## Step6：生成组件

统一采用：

```vue
<script setup lang="ts">
```

推荐结构：

```vue
<script setup lang="ts">
// imports

// props

// emits

// composables

// state

// computed

// watch

// methods

// lifecycle
</script>

<template>

</template>

<style scoped lang="scss">

</style>
```

---

## Step7：Props

必须：

使用 TypeScript。

例如：

```ts
interface Props {
    loading?: boolean;
    data: User[];
}

const props = defineProps<Props>();
```

禁止：

```ts
defineProps();
```

---

## Step8：Emits

必须声明：

```ts
const emit = defineEmits<{

    submit: [];

    cancel: [];

    change: [value: string];

}>();
```

禁止：

未声明直接 emit。

---

## Step9：Element Plus

项目统一：

使用：

```
Element Plus
```

优先：

官方组件。

禁止：

重复封装已有组件。

---

## Step10：Composable

如果存在：

- 表格逻辑
- 分页逻辑
- 查询逻辑
- 上传逻辑
- 请求逻辑

可复用。

应抽离：

```
src/composables
```

统一命名：

```
useXxx
```

---

## Step11：样式

统一：

```scss
<style scoped lang="scss">
```

推荐：

- BEM
- CSS Variables

禁止：

- 行内 style
- 大量 !important

---

## Step12：一致性检查

生成结束后检查：

✓ 是否已有相同组件

✓ 是否重复实现

✓ 是否保持单一职责

✓ Props 是否完整

✓ Emits 是否完整

✓ 是否调用 create-api

✓ 是否调用 create-store

✓ 是否符合组件规范

✓ 是否符合目录规范

---

# NON-NEGOTIABLE

整个生成过程中：

必须：

- 使用 Vue3
- 使用 `<script setup lang="ts">`
- 使用 Composition API
- 使用 TypeScript
- 使用 Element Plus
- 保持组件职责单一
- 保持 Props 类型完整
- 保持 Emits 类型完整
- 优先复用已有组件
- 优先复用已有 Composable

禁止：

- Options API
- JavaScript
- 重复封装组件
- 重复实现业务
- 页面直接请求 Axios
- 页面维护共享状态

---

# 输出目录

页面：

```
src/views
```

业务组件：

```
views/**/components
```

公共组件：

```
src/components
```

Composable：

```
src/composables
```

---

# Checklist

- [ ] 已判断组件类型
- [ ] 已检查是否已有组件
- [ ] 已检查 Figma MCP（如有设计稿）
- [ ] 已分析组件职责
- [ ] 已判断是否需要接口
- [ ] 已判断是否需要 Store
- [ ] 已使用 `<script setup lang="ts">`
- [ ] 已使用 TypeScript
- [ ] Props 已定义类型
- [ ] Emits 已定义类型
- [ ] 已使用 Element Plus
- [ ] 已遵循组件规范
- [ ] 保持与项目代码风格一致
