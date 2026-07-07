根据项目已配置的 OpenSpec Skills，你可以通过以下方式唤起 OpenSpec 的能力：

## 🚀 唤起方式

### 方式一：使用命令前缀（推荐）

通过 `/opsx:` 命令前缀来调用 OpenSpec 的各个能力：

| 命令              | 对应 Skill              | 用途                          |
| ----------------- | ----------------------- | ----------------------------- |
| `/opsx:explore` | openspec-explore        | 探索需求、分析问题、阅读 Spec |
| `/opsx:propose` | openspec-propose        | 创建新的 Change Proposal      |
| `/opsx:apply`   | openspec-apply-change   | 根据 Proposal 实现代码        |
| `/opsx:sync`    | openspec-sync-specs     | 同步更新 Spec 与实现          |
| `/opsx:archive` | openspec-archive-change | 归档已完成的 Change           |

**示例**：

```
/opsx:propose add-user-management
/opsx:apply
/opsx:explore add-user-management
```

### 方式二：自然语言描述

直接描述你的需求，AI 会自动识别并调用对应的 Skill：

```
我想新增一个用户管理功能
```

→ AI 会自动调用 `openspec-propose` 创建 Change

```
我需要实现用户管理功能
```

→ AI 会自动调用 `openspec-apply-change` 执行实现

---

## 🔄 SDD（Spec-Driven Development）工作流程

```
探索 → 提议 → 实现 → 同步 → 归档
  │       │       │       │       │
  ▼       ▼       ▼       ▼       ▼
/opsx:explore → /opsx:propose → /opsx:apply → /opsx:sync → /opsx:archive
```

### 1. 探索阶段（Explore）

```
/opsx:explore
```

用于分析需求、阅读现有 Spec、理解项目结构，不产生代码。

### 2. 提议阶段（Propose）

```
/opsx:propose <change-name>
```

会自动创建三个核心产物：

- **proposal.md** — 需求说明（做什么、为什么）
- **design.md** — 设计方案（怎么做）
- **tasks.md** — 实现任务清单

### 3. 实现阶段（Apply）

```
/opsx:apply
```

根据 tasks.md 中的任务清单逐行实现代码。

### 4. 同步阶段（Sync）

```
/opsx:sync
```

当实现过程中发现设计需要调整时，同步更新 Spec。

### 5. 归档阶段（Archive）

```
/opsx:archive
```

完成所有任务后归档 Change。

---

## 💡 使用建议

如果你已经配置好了 SDD，建议按以下步骤开始：

1. **先探索**：用 `/opsx:explore` 分析你要做的需求
2. **创建提议**：用 `/opsx:propose <name>` 创建 Change
3. **开始实现**：用 `/opsx:apply` 执行代码实现

**立即尝试**：你可以直接告诉我想要实现的功能，或者输入 `/opsx:propose` 开始创建一个新的 Change！
