---
name: create-store
description: 创建或维护 Pinia Store。根据业务需求分析状态归属，生成符合项目规范的 Pinia Store，并自动复用已有 Store、API 和类型定义。
---
# 创建与维护 Pinia Store

## 使用场景

当需要：

- 新增 Store
- 修改 Store
- 新增全局共享状态
- 新增 Getter
- 新增 Action
- 调整 Store 结构

请使用本技能。

并遵循：

```
.agents/rules/07-Pinia规范.md
```

---

# 工作目标

本技能负责：

- 判断是否应该创建 Store
- 判断是否应该复用已有 Store
- 创建符合规范的 Pinia Store
- 自动调用已有 API
- 保持 Store 单一职责
- 保持完整 TypeScript 类型

禁止：

- 创建重复 Store
- 在 Store 中编写 UI 逻辑
- 在 Store 中直接编写 axios 请求

---

# Workflow

## Step1：分析业务需求

首先分析：

当前状态是否应该放入 Pinia。

判断原则：

如果状态：

- 多个页面共享
- 多个组件共享
- 登录状态
- 用户信息
- 权限信息
- 系统配置
- 全局缓存

则：使用 Pinia。

如果状态仅用于：

- Dialog
- Drawer
- Form
- Loading
- 当前 Tab
- 当前页面筛选条件

则：保持组件内部状态。不要创建 Store。

---

## Step2：检查已有 Store

检查：

```
src/stores
```

是否已有相同业务 Store。

例如：

```
user.ts

permission.ts

app.ts

settings.ts
```

如果已有：

优先修改。

禁止重新创建。

---

## Step3：确定 Store 名称

统一命名：

```
useXxxStore
```

例如：

```
useUserStore

useAppStore

usePermissionStore
```

文件名：

```
user.ts

app.ts

permission.ts
```

Store ID：

```
"user"

"app"

"permission"
```

保持一致。

---

## Step4：设计 State

State 仅保存：

- 全局共享状态
- 响应式数据
- 可持久化数据

例如：

```ts
interface UserState {
  token: string;
  userInfo: UserInfo | null;
}
```

禁止：

```
dialogVisible

loading

currentTab

pagination

formData
```

这些属于页面状态。

---

## Step5：设计 Getter

Getter 负责：

- 派生数据
- 格式转换
- 状态计算

例如：

```ts
isLogin

userName

menuTree
```

Getter：

禁止：

- 修改 State
- 调用接口
- async

保持纯函数。

---

## Step6：设计 Action

Action 负责：

- 修改 State
- 调用 API
- 初始化数据
- 登录退出
- 数据同步

允许：

```
async

await
```

禁止：

```
DOM 操作

window 操作

message.error

ElMessage

页面跳转
```

---

## Step7：检查接口

如果 Action 需要调用接口：

首先检查：

```
src/http
```

是否已有对应请求。

如果已有：

直接复用。

如果不存在：

调用：

```
create-api
```

Skill。

禁止：

Store 内直接：

```ts
import axios from "axios";

axios.get(...)
```

统一：

```ts
import { getUserInfo } from "@/http/user";
```

---

## Step8：生成 Store

统一生成：

```
src/stores/<module>.ts
```

推荐结构：

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {

    // state

    // getter

    // action

    return {

    };

});
```

保持：

Composition API 风格。

---

## Step9：一致性检查

检查：

✓ 是否已有重复 Store

✓ 是否存在 UI 状态

✓ 是否直接请求 axios

✓ 是否重复定义类型

✓ 是否符合 Pinia 规范

✓ 是否复用已有 API

✓ 是否复用已有类型

✓ 是否符合目录规范

---

# NON-NEGOTIABLE

整个生成过程中：

禁止：

- 创建重复 Store
- Store 中直接使用 axios
- Store 中直接编写 HTTP 请求
- Store 中定义 Request Type
- Store 中定义 Response Type
- Store 中维护页面 UI 状态
- Store 中保存大量临时数据
- Store 中编写 DOM 操作

必须：

- 使用 Pinia
- 使用 TypeScript
- 保持单一职责
- 优先复用已有 Store
- 优先复用已有 API
- 优先复用已有类型

---

# 输出目录

```
src
└── stores
    ├── app.ts
    ├── user.ts
    ├── permission.ts
    └── <module>.ts
```

---

# Checklist

- [ ] 已分析状态是否适合放入 Pinia
- [ ] 已检查是否已有 Store
- [ ] 已确定 Store 名称
- [ ] 已设计 State
- [ ] 已设计 Getter
- [ ] 已设计 Action
- [ ] 已复用已有 API
- [ ] 已遵循 Pinia 规范
- [ ] 未直接使用 axios
- [ ] 未保存页面 UI 状态
- [ ] 未重复定义类型
- [ ] 保持单一职责
