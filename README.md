# 🔧 API 管理与用户后台系统

基于 **Vue 3 + Element Plus + Node.js + 数据库** 的全栈后台管理系统。  
系统支持用户注册登录、接口调用统计、用户管理等功能，适合 API 平台的管理与展示。

---

## ✨ 功能特性

### 🔑 用户模块
- 用户注册、登录（基于数据库）
- 登录状态管理（JWT / Session）
- 用户角色管理（普通用户 / 管理员）

### 🌐 API 管理模块
- 展示多个 API 的使用情况
- 统计 API 请求次数
- 按时间/用户查询调用记录

### 👥 用户管理模块
- 管理所有注册用户
- 编辑/删除用户

### ⚙ 系统特性
- 前后端分离架构
- Element Plus 实现后台管理界面
- Axios 封装 API 请求
- 支持响应式界面

---

## 🛠 技术栈

### 前端
- [Vue 3](https://vuejs.org/) - 前端框架
- [Element Plus](https://element-plus.org/) - UI 组件库
- [Axios](https://axios-http.com/) - API 请求

### 后端
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) - 服务端框架
- [JWT](https://jwt.io/) - 用户认证
- [数据库] MySQL / MongoDB （根据实际项目选择）

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
