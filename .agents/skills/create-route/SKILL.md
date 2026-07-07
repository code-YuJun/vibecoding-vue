---
name: create-route
description: 根据项目规范新增页面并注册 Vue Router 路由。自动创建页面目录、注册路由，并保持与项目现有架构一致。
---
# 创建页面路由

## 使用场景

当需要：

- 新增业务页面
- 新增模块入口
- 为页面注册路由
- 调整已有路由

请使用本技能。

**必须遵守：**

```
.agents/rules/06-路由规范.md
```

---

# Step 1：分析需求

根据用户需求确定：

- 页面名称
- 页面标题
- 路由 Path
- 路由 Name

例如：

需求：

```
新增实验管理页面
```

得到：

```
目录：

views/Experiment

Path：

/experiment

Name：

Experiment

Title：

实验管理
```

---

# Step 2：检查页面

检查：

```
src/views/<Page>
```

是否存在。

存在：

复用。

不存在：

创建：

```
views
└── Experiment
    └── index.vue
```

不要重复创建页面。

---

# Step 3：检查 Router

检查：

```
src/router/index.ts
```

确认：

- Path 是否已存在。
- Name 是否已存在。

如存在：

复用或更新。

禁止重复注册。

---

# Step 4：新增路由

在：

```
src/router/index.ts
```

新增：

```ts
{
    path: '/experiment',
    name: 'Experiment',
    component: () => import('@/views/Experiment/index.vue'),
    meta: {
        title: '实验管理'
    }
}
```

要求：

- 使用懒加载。
- Name 与目录一致。
- Path 使用 kebab-case。
- 设置 `meta.title`。

---

# Step 5：检查页面跳转

如果需求包含页面跳转：

统一使用：

```ts
router.push()
```

或：

```ts
router.replace()
```

禁止：

```ts
window.location.href
```

---

# Step 6：完成检查

确认：

- 页面目录正确。
- 路由注册完成。
- Path 唯一。
- Name 唯一。
- 页面使用懒加载。
- 已设置 `meta.title`。

---

# 输出结果

完成后应包括：

- 新增页面目录。
- 新增 `index.vue`。
- 注册 Router。
- 完成页面跳转。
- 保持与项目现有路由风格一致。

---

# Checklist

- [ ] 已创建页面目录
- [ ] 已创建 index.vue
- [ ] 已注册 Router
- [ ] 已使用懒加载
- [ ] 已设置 meta.title
- [ ] 已检查重复 Path
- [ ] 已检查重复 Name
- [ ] 已遵守 06-路由规范
