
---
alwaysApply: false
description: 项目 API 开发规范。当涉及新增、修改、维护接口时读取。
---
# API 规范

## 唯一数据源（NON-NEGOTIABLE）

Apifox 是项目所有 HTTP 接口定义的唯一事实来源（Single Source of Truth）。

所有接口信息，包括：

- URL
- Method
- Query 参数
- Path 参数
- Request Body
- Response
- Enum
- Required
- Nullable

都必须来源于 Apifox MCP。

禁止：

- AI 猜测字段
- AI 修改字段类型
- AI 新增字段
- AI 删除字段
- AI 修改 required
- AI 修改 nullable
- AI 修改 enum

如果 Apifox 与需求不一致：

**先修改 Apifox，再重新生成代码。**

---

# 请求规范（NON-NEGOTIABLE）

所有 HTTP 请求必须使用：

```
axios
```

禁止：

- fetch
- XMLHttpRequest
- 其它 HTTP SDK

项目统一维护 Axios 实例。

业务代码只能使用项目封装后的 axios 实例。

禁止：

```ts
import axios from "axios";

axios.get(...)
```

允许：

```ts
import request from "@/utils/request";

request.get(...)
```

request 实例负责：

- BaseURL
- Token
- Timeout
- 请求拦截
- 响应拦截
- 错误处理

---

# 文件组织

```
src
├── http
│   └── xxx.ts
│
└── interfaces
    └── xxx
        ├── api.ts
        └── model.ts
```

## src/http

负责：

- URL
- Method
- Axios 调用

禁止：

- 类型定义
- 业务逻辑

---

## api.ts

负责：

接口 Request

接口 Response

例如：

```
GetUserListParams

GetUserListResponse
```

---

## model.ts

负责：

所有公共业务模型。

例如：

```
User

Banner

Article
```

多个接口共用时必须复用。

禁止重复定义。

---

# Response 规范

假设后端统一返回：

```json
{
    "code":0,
    "msg":"success",
    "data":{}
}
```

如果 Axios 已在响应拦截器中返回：

```
response.data.data
```

那么：

Response 类型仅表示：

```
data
```

否则：

严格按照 Apifox Schema 定义。

禁止 AI 自行省略字段。

---

# 命名规范（NON-NEGOTIABLE）

获取列表：

```
getXxxList
```

获取详情：

```
getXxxDetail
```

创建：

```
createXxx
```

修改：

```
updateXxx
```

删除：

```
deleteXxx
```

禁止：

```
fetchXXX

queryXXX

loadXXX
```

---

# 类型规范

所有 Request / Response 类型必须来源于：

Apifox OpenAPI。

禁止：

```
any
```

优先：

```
interface
```

其次：

```
type
```

业务模型统一抽取到：

```
model.ts
```

禁止重复定义。

---

# 错误处理

HTTP 错误统一由 Axios 响应拦截器处理。

业务代码：

禁止重复：

```
message.error(...)
```

允许：

- 表单校验
- 成功提示
- 业务提示

---

# Skill

新增或修改接口时：

必须使用：

```
.agents/skills/create-api/SKILL.md
```

禁止直接手写 Request / Response 类型。
