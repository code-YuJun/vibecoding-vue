## 唤起方式

### 使用命令前缀

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

## SDD（Spec-Driven Development）工作流程

```
 探索         	       提议         实现          同步           归档
  │       		│           │             │             │
  ▼       		▼           ▼             ▼             ▼
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

## 案例

```

提问：/openspec-explore 我要新增一个联系人列表页面。请先了解当前 Vite 项目结构（目前还没有业务代码），并通过 Figma MCP 读取联系人列表页面的 UI 设计，UI 设计稿地址：https://www.figma.com/design/0Ki3Mk9TmqHxFLDYaos4wJ/-FREE--Contact-Page-Admin-Dashboard--Community-?node-id=0-17&t=ABhwJLhXv1WyS8gx-4、通过 Apifox MCP 读取联系人列表接口，分析需要哪些组件、数据结构和 API 调用。
回答：...

提问：/openspec-propose 
回答：proposal.md（项目提案）、design.md（设计文档）、specs（规范文档）、tasks.md（任务清单）

提问：/openspec-apply-change 开始实施任务
回答：....

提问：/openspec-sync-specs
回答：

提问：/openspec-archive-change 归档
回答：
```
