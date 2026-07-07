AI 实践：

1. 在当前目录创建 Vite + Vue 3 + TS 项目

```
npm create vite@latest . -- --template vue-ts
```

2. 架构自己设计，AI 负责遵守，先创建那些你已经确定长期会存在的基础目录。

```
src
├── assets          # 静态资源
├── components      # 公共组件
├── composables     # 组合式函数
├── http            # Axios 请求
├── router          # 路由
├── stores          # Pinia
├── styles          # 全局样式
├── types           # 全局类型
├── utils           # 工具函数
├── views           # 页面
├── App.vue
└── main.ts
```

3. 根据当前的目录结构，完善 rules/03-项目结构.md 内容
4. 创建 vue-router 之后，再完成 06-路由规范.md 和 create-route/SKILL.md

   ```
   npm install vue-router@4

   创建 router/index.ts

   在入口文件中注册 Router
   ```

   npm install vue-router

   npm install pinia

   npm install axios

   npm install element-plus

   npm install sass

   npm install unplugin-auto-import

   npm install unplugin-vue-components
5. figma-implement-design

* **figma-implement-design** = **Figma → 代码**

6. 这么多的 rules ，如何判断使用哪个

```
你的 Prompt
      │
      ▼
AI 编辑器（Trae）
      │
      ├── 收集当前上下文
      │      ├── 当前打开的文件
      │      ├── 当前修改的文件
      │      ├── 用户 Prompt
      │      ├── Rules
      │      ├── Skills
      │      └── MCP 等
      │
      ▼
Rules 选择器
      │
      ├── alwaysApply = true
      │        ↓
      │   一定加入上下文
      │
      ├── alwaysApply = false
      │        ↓
      │   根据 Prompt 判断是否需要
      │
      ▼
最终发送给 LLM
```

7. AI 编辑器通常会综合多个信息来判断是否加载某个 Rule。

   参考：https://chatgpt.com/c/WEB:397b7a15-4b6e-454a-847a-aa708e2c8555
8. 大模型如何判断使用哪个 skill

   参考：https://chatgpt.com/g/g-p-6a4c631801b08191aea56658814b7ea8-trae/c/6a4ca4a9-af6c-83ee-b231-4a54cedb070b
9. openspec/config.yaml

   参考：https://chatgpt.com/g/g-p-6a4c631801b08191aea56658814b7ea8-trae/c/6a4cac86-eb40-83ee-950b-9e3a51c2dfb7
10. openspec 的使用

    参考：https://chatgpt.com/g/g-p-6a4c631801b08191aea56658814b7ea8-trae/c/6a4cb36e-cf14-83e8-8a12-b4de3fefb548
