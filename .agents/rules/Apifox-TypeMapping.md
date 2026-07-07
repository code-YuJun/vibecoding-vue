---
alwaysApply: false
description: Apifox Schema 到 TypeScript 类型映射规范，以及接口代码生成约定。
---
# Apifox Type Mapping

## Purpose

本规范用于统一 Apifox Schema 在前端(TypeScript)中的类型映射。

当 AI 通过 Apifox MCP 获取接口信息时，应严格遵循本规范生成：

- TypeScript Interface
- Type Alias
- DTO
- Request 类型
- Response 类型
- Model 类型

避免不同接口生成不同风格的类型定义。

---

# General Principles

## 1. 优先使用 TypeScript 原生类型

生成的代码应尽量保持简单。

推荐：

```ts
string
number
boolean
```

避免：

```ts
String
Number
Boolean
Object
```

---

## 2. 不生成 any

禁止：

```ts
any
```

优先：

```ts
unknown
Record<string, unknown>
具体 Interface
```

只有当 Apifox 无法推断结构时，允许使用：

```ts
unknown
```

---

## 3. 优先 Interface

对象类型统一生成 Interface。

推荐：

```ts
export interface User {
  id: number
  name: string
}
```

不要：

```ts
type User = {
  ...
}
```

Type Alias 仅用于：

- 联合类型
- 字面量类型
- 工具类型

---

# Primitive Mapping

| Apifox Type | Format    | TypeScript |
| ----------- | --------- | ---------- |
| string      | -         | string     |
| string      | date      | string     |
| string      | date-time | string     |
| string      | time      | string     |
| string      | uuid      | string     |
| string      | email     | string     |
| string      | uri       | string     |
| integer     | int32     | number     |
| integer     | int64     | number     |
| number      | float     | number     |
| number      | double    | number     |
| number      | decimal   | number     |
| boolean     | -         | boolean    |

---

# Object Mapping

Apifox

```json
{
  "id": 1,
  "name": "Tom"
}
```

生成：

```ts
export interface User {
  id: number
  name: string
}
```

不要生成：

```ts
Object
```

---

# Array Mapping

Apifox

```json
[
  {
    "id": 1
  }
]
```

生成：

```ts
User[]
```

不要：

```ts
Array<any>
```

---

# Enum Mapping

Apifox

```json
status

1
2
3
```

生成：

```ts
export type Status = 1 | 2 | 3
```

如果有枚举名称：

```ts
export enum Status {
  Enable = 1,
  Disable = 2
}
```

优先保留 Apifox 中配置的枚举描述。

---

# Nullable Mapping

如果字段允许为空：

```yaml
nullable: true
```

生成：

```ts
name: string | null
```

不要：

```ts
name?: string
```

nullable 与 optional 含义不同。

---

# Optional Mapping

非 Required 字段：

```ts
name?: string
```

Required 字段：

```ts
name: string
```

---

# Dictionary Mapping

Apifox

```json
{
  "additionalProperties": {}
}
```

生成：

```ts
Record<string, unknown>
```

如果 Value 类型明确：

```ts
Record<string, string>

Record<string, number>

Record<string, User>
```

---

# Empty Object

如果接口返回：

```json
{}
```

生成：

```ts
Record<string, never>
```

不要：

```ts
{}
```

---

# Unknown Schema

如果 Schema 无法推断：

生成：

```ts
unknown
```

禁止：

```ts
any
```

---

# Date Handling

Apifox 中：

```
date
date-time
time
```

统一生成：

```ts
string
```

前端自行决定是否转换：

```ts
dayjs()

new Date()

date-fns
```

不要直接生成：

```ts
Date
```

---

# File Upload

Apifox

```
type: string
format: binary
```

生成：

```ts
File
```

多个文件：

```ts
File[]
```

---

# Binary Download

如果接口返回：

```
application/octet-stream
```

生成：

```ts
Blob
```

Axios：

```ts
responseType: 'blob'
```

---

# Pagination

推荐统一分页结构：

```ts
export interface PageResult<T> {
  total: number
  pageNum: number
  pageSize: number
  list: T[]
}
```

不要每个接口生成不同分页结构。

---

# API Response

如果项目统一响应：

```json
{
    "code":0,
    "message":"",
    "data":{}
}
```

生成：

```ts
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
```

业务接口：

```ts
ApiResponse<User>
```

---

# Naming Convention

Interface：

```
User

UserInfo

UserDetail
```

Request：

```
LoginRequest

CreateUserRequest

UpdateUserRequest
```

Response：

```
LoginResponse

UserListResponse
```

分页：

```
PageResult<User>
```

---

# Import Rules

优先：

```ts
import type { User } from './types'
```

不要：

```ts
import { User } from './types'
```

类型导入统一使用：

```ts
import type
```

---

# Code Style

生成：

- export interface
- PascalCase 类型名
- camelCase 字段名
- readonly 仅在接口明确要求时使用
- 不生成 any
- 不生成 Object
- 不生成 {}
- 不生成 Function

---

# AI Generation Rules

当 AI 使用 Apifox MCP 读取接口时，应遵循以下规则：

1. 根据 Schema 自动生成 TypeScript Interface。
2. 严格按照本规范进行类型映射。
3. 优先复用已有类型，避免重复生成。
4. 保持字段名称与 Apifox 完全一致，不擅自修改。
5. 根据 Required 判断是否使用可选属性（?）。
6. 根据 nullable 生成 `| null`。
7. 优先生成可维护、可复用的类型定义。
8. 所有接口返回类型应使用统一的 `ApiResponse<T>`（如果项目采用统一响应结构）。
9. 避免生成重复、冗余或无意义的类型。
10. 若项目已有公共类型，应优先引用，不重复定义。
