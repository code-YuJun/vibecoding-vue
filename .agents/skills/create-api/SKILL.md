---
name: create-api
description: 从 Apifox MCP 自动读取 OpenAPI Schema，生成符合项目规范的 TypeScript 类型、Axios 请求封装及业务模型。禁止 AI 推断任何接口字段。
---
# 创建 API（Apifox MCP）

## 目标

本技能用于：

- 新增接口
- 同步接口
- 更新接口
- 批量生成接口

Apifox 是唯一接口来源。

禁止 AI 设计接口。

---

# Workflow

## Step1：刷新 Apifox

首先刷新最新 OpenAPI：

```
refresh_project_oas_xxx()
```

保证读取的是最新版本。

---

## Step2：读取 OpenAPI

调用：

```
read_project_oas_xxx()
```

获取：

- paths
- components.schemas
- operationId
- parameters
- requestBody
- responses

---

## Step3：定位目标接口

根据用户需求找到目标接口。

记录：

- URL
- HTTP Method
- operationId
- Request Schema
- Response Schema

如果不存在：

停止生成。

提示：

> 请先在 Apifox 创建接口。

禁止自行创建接口。

---

## Step4：解析 Schema

调用：

```
read_project_oas_ref_resources_xxx()
```

递归解析：

- requestBody
- response
- components
- array
- object
- nested schema

直到：

所有 `$ref`

全部解析完成。

---

## Step5：生成业务模型

优先识别：

可复用对象。

例如：

```
User

Banner

Role

Permission
```

生成：

```
src/interfaces/<module>/model.ts
```

原则：

多个接口共用的数据模型必须复用。

禁止重复定义。

---

## Step6：生成接口类型

根据 Request Schema：

生成：

```
xxxParams
```

根据 Response Schema：

生成：

```
xxxResponse
```

生成：

```
src/interfaces/<module>/api.ts
```

要求：

- 字段类型一致
- required 一致
- nullable 一致
- enum 一致

禁止修改。

---

## Step7：生成 Axios 请求

生成：

```
src/http/<module>.ts
```

统一使用：

```ts
import request from "@/utils/request";
```

例如：

```ts
import request from "@/utils/request";
import type {
    GetUserListParams,
    GetUserListResponse,
} from "@/interfaces/user/api";

export const getUserList = (params: GetUserListParams) => {
    return request.get<GetUserListResponse>(
        "/user/list",
        {
            params,
        }
    );
};

export const createUser = (data: CreateUserParams) => {
    return request.post(
        "/user",
        data
    );
};

export const updateUser = (data: UpdateUserParams) => {
    return request.put(
        `/user/${data.id}`,
        data
    );
};

export const deleteUser = (id: number) => {
    return request.delete(
        `/user/${id}`
    );
};
```

禁止：

```ts
import axios from "axios";

axios.get(...)
```

禁止：

```
fetch(...)
```

---

## Step8：一致性检查

生成完成后检查：

- 是否还有未解析 `$ref`
- 是否存在 any
- 是否存在重复 interface
- 是否存在重复 model
- 是否存在未使用 import
- 是否符合 API 规范
- 是否全部来源于 Apifox

---

# NON-NEGOTIABLE

整个生成过程中：

禁止：

- 猜测字段
- 修改字段
- 新增字段
- 删除字段
- 修改类型
- 修改 enum
- 修改 required
- 修改 nullable

如果发现：

Apifox 与需求不一致：

立即停止。

提示：

> 请先修改 Apifox，再重新执行本技能。

---

# 输出目录

```
src
├── http
│   └── <module>.ts
│
└── interfaces
    └── <module>
        ├── api.ts
        └── model.ts
```

---

# 完成标准（Checklist）

- [ ] 已刷新 Apifox
- [ ] 已读取最新 OAS
- [ ] 已解析全部 `$ref`
- [ ] 已生成 model.ts
- [ ] 已生成 api.ts
- [ ] 已生成 Axios 请求
- [ ] 未使用 any
- [ ] 与 Apifox Schema 完全一致
- [ ] 符合 API 规范
