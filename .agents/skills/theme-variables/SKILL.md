---
name: theme-variables
description: >
  指导 AI 在 Vue3 + Element Plus 项目中正确使用主题变量编写样式。
  当新增或修改组件、页面、布局或 Element Plus 样式时，优先使用
  Element Plus CSS Variables 和项目自定义 CSS Variables，避免硬编码颜色，
  保证主题一致性和可维护性。
---
# Theme Variables

## 技能目标

本技能用于指导 AI 在编写或修改样式时，正确使用主题变量，避免硬编码颜色和重复定义样式，确保项目支持主题切换并保持统一的视觉风格。

> 所有样式规范以 `rules/09-样式规范.md` 为准，本技能仅描述执行流程，不重复定义规范。

---

# 适用场景

当出现以下任务时，应使用本技能：

- 新增 Vue 页面样式
- 新增 Vue 组件样式
- 修改已有组件样式
- 调整 Element Plus 组件样式
- 编写 SCSS 文件
- 新增主题变量
- 修改颜色、背景、边框、阴影等视觉样式
- 优化暗色/浅色主题兼容性

---

# 依赖 Rules

执行过程中，应同时遵循：

- `rules/04-组件规范.md`
- `rules/09-样式规范.md`
- `rules/08-通用约束.md`

---

# 执行流程

## 第一步：分析样式需求

先判断当前修改属于哪一类：

- 文本颜色
- 背景颜色
- 边框颜色
- 阴影
- 圆角
- 间距
- 字体
- 尺寸
- Element Plus 组件样式
- 自定义组件样式

---

## 第二步：优先使用 Element Plus CSS Variables

如果 Element Plus 已提供对应变量，应优先使用。

示例：

```scss
color: var(--el-text-color-primary);

background-color: var(--el-bg-color);

border-color: var(--el-border-color);

box-shadow: var(--el-box-shadow);

border-radius: var(--el-border-radius-base);
```

避免重新定义已有语义。

---

## 第三步：使用项目自定义 CSS Variables

如果 Element Plus 未提供合适变量，则使用项目统一维护的 CSS Variables。

例如：

```scss
background: var(--app-card-bg);

color: var(--app-primary-text);

border-radius: var(--app-radius-md);

padding: var(--app-spacing-md);
```

不得在多个组件中重复定义相同语义的变量。

---

## 第四步：避免硬编码

避免直接写入固定颜色、字体、圆角等值。

不推荐：

```scss
color: #409eff;

background: #ffffff;

border: 1px solid #dcdfe6;

border-radius: 8px;
```

推荐：

```scss
color: var(--el-color-primary);

background: var(--el-bg-color);

border-color: var(--el-border-color);

border-radius: var(--app-radius-md);
```

---

## 第五步：检查主题兼容性

完成样式后，应确认：

- 是否支持浅色主题
- 是否支持暗色主题（如项目支持）
- 是否存在写死颜色导致主题切换异常
- 是否复用了已有变量

---

# 输出要求

生成样式时，应遵循以下原则：

1. 优先使用 Element Plus CSS Variables。
2. Element Plus 不支持时，再使用项目变量。
3. 不重复创建已有变量。
4. 不硬编码主题相关颜色。
5. 保持变量命名统一。
6. 保持样式可维护、可扩展。

---

# 完成检查

生成样式前，确认：

- [ ] 未硬编码主题颜色
- [ ] 优先使用 Element Plus Variables
- [ ] 正确使用项目 Variables
- [ ] 未重复创建变量
- [ ] 满足 Rules 中的样式规范
- [ ] 保持主题一致性
