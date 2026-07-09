## ADDED Requirements

### Requirement: 联系人列表分页浏览

系统 SHALL 提供联系人列表的分页浏览能力，默认每页展示 10 条记录，用户可通过分页控件切换页码。

#### Scenario: 首次进入页面加载列表

- **WHEN** 用户访问 `/contacts` 路由
- **THEN** 系统以 page=1、pageSize=10 调用 `GET /api/list` 获取数据
- **AND** 在卡片网格中展示返回的联系人列表
- **AND** 底部分页显示"Showing 1-10 from {total} data"

#### Scenario: 切换到下一页

- **WHEN** 用户点击分页控件的"下一页"按钮
- **THEN** 系统以 page=2 调用 `GET /api/list`
- **AND** 列表刷新展示第 2 页数据
- **AND** 分页控件高亮当前页码

#### Scenario: 跳转到指定页

- **WHEN** 用户点击分页控件的页码数字
- **THEN** 系统以对应 page 调用 `GET /api/list`
- **AND** 列表刷新展示该页数据

### Requirement: 关键词搜索联系人

系统 SHALL 提供搜索框，用户输入关键词后模糊匹配姓名 / 邮箱 / 公司 / 职位字段，搜索时自动重置到第 1 页。

#### Scenario: 输入关键词搜索

- **WHEN** 用户在搜索框输入关键词并停止输入 300ms
- **THEN** 系统以 page=1、keyword=输入值调用 `GET /api/list`
- **AND** 列表刷新展示匹配结果
- **AND** 分页信息更新为搜索后的总数

#### Scenario: 清空搜索关键词

- **WHEN** 用户清空搜索框
- **THEN** 系统以 page=1、keyword 为空调用 `GET /api/list`
- **AND** 列表恢复展示全部数据

### Requirement: Grid 与 List 双视图切换

系统 SHALL 提供卡片网格（Grid）与列表表格（List）两种视图切换，默认展示 Grid 视图，用户切换后视图模式持久保持。

#### Scenario: 切换到 List 视图

- **WHEN** 用户点击工具栏的 List 视图切换图标
- **THEN** 系统将列表展示从卡片网格切换为表格行布局
- **AND** 表格列包含：头像、姓名、职位、公司、联系方式（电话+邮箱）、团队徽章
- **AND** 当前视图模式状态更新为 list

#### Scenario: 切换回 Grid 视图

- **WHEN** 用户点击工具栏的 Grid 视图切换图标
- **THEN** 系统将列表展示从表格切回卡片网格
- **AND** 当前视图模式状态更新为 grid

### Requirement: 联系人卡片展示

系统 SHALL 在 Grid 视图中以卡片形式展示单条联系人信息，卡片包含：头像、姓名、职位@公司、电话、邮箱、团队徽章。

#### Scenario: 渲染完整信息的卡片

- **WHEN** 接口返回的联系人数据包含全部字段
- **THEN** 卡片展示圆形头像（105×105，圆角 26px）
- **AND** 姓名（Cairo Bold 18px，#202020）
- **AND** 职位与公司名（公司名用紫色 #6418C3 加粗）
- **AND** 电话号码（带电话图标）
- **AND** 邮箱（带邮箱图标）
- **AND** 右下角团队徽章（根据 teamCode 渲染对应色值）

#### Scenario: 头像为空时显示占位

- **WHEN** 联系人数据的 avatar 字段为空字符串
- **THEN** 卡片头像位置显示姓名首字母大写的圆形占位

#### Scenario: 团队徽章按 teamCode 渲染颜色

- **WHEN** 联系人数据包含 teamCode
- **THEN** 徽章按前端色表渲染：Hs→#6418C3、Av→#266FC7、Cz→#DC3472
- **AND** 徽章显示 teamCode 对应文本（Hs / AV / Cz）
- **AND** 未知 teamCode 时使用 #C2C2C2 灰色兜底，显示首字母大写

### Requirement: 工具栏交互

系统 SHALL 在页面顶部提供工具栏，包含标题、搜索框、视图切换图标、New Contact 按钮。

#### Scenario: 点击 New Contact 按钮

- **WHEN** 用户点击"New Contact"按钮
- **THEN** 系统弹出 ElMessage 提示"功能开发中"
- **AND** 不发起任何接口请求

#### Scenario: 点击卡片更多图标

- **WHEN** 用户点击卡片右上角的"更多"图标
- **THEN** 系统弹出 ElMessage 提示"功能开发中"
- **AND** 不发起任何接口请求

### Requirement: Axios 响应拦截器统一返回 data 字段

系统 SHALL 修改 Axios 响应拦截器，统一返回 `response.data.data`（业务数据本体），业务层无需再解构 `{code,msg,data}`。

#### Scenario: 接口调用获取业务数据

- **WHEN** 业务代码通过 `request.get('/api/list')` 调用接口
- **THEN** 返回值直接为业务数据本体（如 `{pagination, list}`）
- **AND** 业务层无需再访问 `.data` 属性

### Requirement: 路由配置

系统 SHALL 新增 `/contacts` 路由作为联系人列表页入口，并将根路径 `/` 重定向到 `/contacts`。

#### Scenario: 访问根路径重定向

- **WHEN** 用户访问 `/` 路径
- **THEN** 系统重定向到 `/contacts`
- **AND** 展示联系人列表页面

#### Scenario: 直接访问联系人路由

- **WHEN** 用户直接访问 `/contacts`
- **THEN** 系统正常加载联系人列表页面
