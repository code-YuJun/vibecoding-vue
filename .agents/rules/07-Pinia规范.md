---
alwaysApply: false
description: 项目 Pinia 状态管理规范。当新增或修改 Store 时读取。
---
# Pinia 规范

## 状态管理原则（NON-NEGOTIABLE）

项目所有全局共享状态统一使用 **Pinia**。

禁止：

- Vuex
- EventBus
- window 全局变量
- 任意全局对象共享状态

如果状态仅在当前页面或组件中使用，应优先使用：

```ts
ref()

reactive()

computed()
```

只有多个页面或多个组件共享的数据，才允许放入 Pinia。

---

# Store 职责

Store 负责：

- 全局共享状态
- 用户信息
- 登录状态
- 权限信息
- 系统配置
- 页面缓存
- 可复用业务状态

Store 不负责：

- 页面 UI 状态
- Dialog 开关
- Loading 状态
- Form 数据
- 临时变量

上述状态应保存在组件内部。

---

# Store 目录规范

统一放置于：

```
src/stores
```

推荐目录：

```
src/
└── stores/
    ├── user.ts
    ├── app.ts
    ├── permission.ts
    ├── settings.ts
    └── xxx.ts
```

一个业务模块对应一个 Store。

禁止：

```
index.ts

store.ts

mainStore.ts
```

这类职责不明确的命名。

---

# Store 命名

统一使用：

```
useXxxStore
```

例如：

```ts
useUserStore()

useAppStore()

usePermissionStore()

useSettingsStore()
```

Store ID：

```ts
defineStore("user", ...)
```

应保持简洁，并与文件名保持一致。

---

# State

State 仅保存：

- 可共享的数据
- 可持久化的数据
- 可响应式的数据

例如：

```ts
interface UserState {
    token: string;
    userInfo: User | null;
}
```

禁止：

```ts
dialogVisible

loading

currentTab

activeIndex
```

这些属于页面状态。

---

# Getter

Getter 负责：

- 派生数据
- 数据格式转换
- 数据计算

例如：

```ts
isLogin

userName

menuTree
```

Getter 必须保持：

- 无副作用
- 不修改 State
- 不发起请求

禁止：

```ts
async

axios

修改 state
```

---

# Action

Action 负责：

- 修改 State
- 调用 HTTP
- 业务逻辑
- 数据初始化

例如：

```ts
login()

logout()

getUserInfo()

refreshPermission()
```

Action 内：

允许：

- await
- 调用接口
- 更新 State

禁止：

- 操作 DOM
- 页面跳转
- message 提示（除非项目统一要求）

---

# HTTP 请求

涉及接口调用时：

统一使用：

```
src/http
```

例如：

```ts
import { getUserInfo } from "@/http/user";
```

禁止：

```ts
import axios from "axios";

axios.get(...)
```

禁止：

```ts
fetch(...)
```

所有接口必须遵循：

```
.agents/rules/05-API规范.md
```

---

# Store 拆分原则

一个 Store 负责一个业务领域。

例如：

```
User

Permission

App

Settings
```

禁止：

一个 Store 管理整个项目。

例如：

```
GlobalStore

MainStore

AppStore（包含所有业务）
```

如果 State 超过约 300 行，应考虑拆分 Store。

---

# 数据修改原则

State 只能通过 Action 修改。

例如：

```ts
const userStore = useUserStore();

await userStore.login();
```

禁止：

```ts
userStore.token = "xxx";
```

除非项目已有明确约定。

---

# 持久化

如果项目使用：

```
pinia-plugin-persistedstate
```

仅允许持久化：

- Token
- 用户信息
- 系统配置
- 用户偏好

禁止持久化：

- Loading
- Dialog
- 临时数据
- 查询条件
- 分页信息

---

# 类型规范

所有 Store 必须使用 TypeScript。

推荐：

```ts
interface State {}

interface UserInfo {}

type UserRole = ...
```

禁止：

```ts
any
```

优先保持完整类型。

---

# AI 开发约定

AI 创建 Store 时必须遵循：

- 优先检查是否已有相同业务 Store。
- 不重复创建已有状态。
- 保持单一职责。
- 优先复用已有类型定义。
- 接口统一调用 `src/http`。
- 不在 Store 中定义接口类型。
- 不在 Store 中编写页面 UI 逻辑。
- 保持与项目已有 Store 风格一致。
