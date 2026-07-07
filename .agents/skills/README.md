

---
name: project-skills-index
description: >
  项目 Skills 索引。帮助 AI 根据不同开发场景选择对应 Skill，
  Skills 负责指导开发流程（Workflow），Rules 负责约束开发规范（Rules）。
---
# 项目 Skills 索引

本目录存放项目开发过程中使用的 Skills。

## Skills 与 Rules 的关系

项目采用 **Rules + Skills** 的组织方式：

- **Rules**：定义开发规范（What）
- **Skills**：定义开发流程（How）

开发过程中，应先选择合适的 Skill，再遵循对应 Rules 完成开发。

---

# 项目自定义 Skills

## create-api

**适用场景**

- 新增接口
- 修改接口
- 新增 API Module
- 对接 Apifox 接口

**关联 Rules**

- `rules/05-API规范.md`
- `rules/02-编码规范.md`

---

## create-component

**适用场景**

- 新建 Vue 页面
- 新建公共组件
- 拆分大型组件
- 重构组件

**关联 Rules**

- `rules/04-组件规范.md`
- `rules/03-项目结构.md`
- `rules/09-样式规范.md`

---

## create-route

**适用场景**

- 新增页面路由
- 修改 Router 配置
- 配置动态路由
- 配置权限路由

**关联 Rules**

- `rules/06-路由规范.md`
- `rules/03-项目结构.md`

---

## create-store

**适用场景**

- 新建 Pinia Store
- 修改 Store
- 状态共享
- Store 拆分

**关联 Rules**

- `rules/07-Pinia规范.md`
- `rules/02-编码规范.md`

---

## theme-variables

**适用场景**

- 编写组件样式
- 编写页面样式
- 修改 Element Plus 样式
- 新增主题变量

**关联 Rules**

- `rules/09-样式规范.md`
- `rules/04-组件规范.md`

---

# OpenSpec Skills

用于需求驱动开发（SDD）流程。

## openspec-explore

分析需求、阅读 Spec、理解已有能力。

---

## openspec-propose

创建新的 Proposal、Tasks、Spec。

---

## openspec-apply-change

根据 Proposal 实现代码。

---

## openspec-sync-specs

同步更新 Spec 与实现。

---

## openspec-archive-change

归档已完成的 Change。

---

# 第三方 Skills

## figma-implement-design

根据 Figma 设计稿实现 Vue 页面或组件。

适用于：

- Figma → Vue 页面
- Figma → Element Plus 页面
- 根据设计稿修改已有页面
- UI 一致性校验

---

# Skills 使用原则

开发过程中，应根据任务自动选择最合适的 Skill。

例如：

| 开发任务            | 推荐 Skill              |
| ------------------- | ----------------------- |
| 新建页面            | create-component        |
| 新建组件            | create-component        |
| 新增接口            | create-api              |
| 对接 Apifox         | create-api              |
| 新增 Pinia Store    | create-store            |
| 新增路由            | create-route            |
| 编写样式            | theme-variables         |
| 根据 Figma 开发页面 | figma-implement-design  |
| 新增需求            | openspec-propose        |
| 实现需求            | openspec-apply-change   |
| 更新 Spec           | openspec-sync-specs     |
| 完成需求归档        | openspec-archive-change |

---

# 新增 Skill 规范

新增 Skill 时，应遵循以下原则：

1. 一个 Skill 只负责一个开发场景。
2. Skill 负责开发流程，不重复 Rules 中的规范。
3. Skill 应明确适用场景和关联 Rules。
4. 新增 Skill 后，应同步更新本索引。
