# TodoList 项目帮助文件

这个文件用于记录项目里每个文件的作用，方便 0 基础学习。

以后如果新增文件、删除文件、移动文件，或者某个文件的作用变了，都应该同步更新这个文件。

## 项目是什么

这是一个纯前端 TodoList 网站项目。

技术栈：

- React：用来写页面和交互。
- Vite：用来启动本地开发网站和打包项目。
- TypeScript：让 JavaScript 多一层类型检查，减少低级错误。

目前没有后端、没有数据库、没有登录功能。

任务数据保存在浏览器的 `localStorage` 里，刷新页面后不会丢失。

## 怎么启动项目

第一次拿到项目后，需要先安装依赖：

```bash
npm install
```

启动本地网站：

```bash
npm run dev
```

终端会显示一个本地地址，通常是：

```text
http://localhost:5173
```

在浏览器打开这个地址，就能看到网站。

## 文件结构

```text
ToDoList/
├── .gitignore
├── HELP.md
├── PRD.md
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── node_modules/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── vite-env.d.ts
    └── style.css
```

## 每个文件的作用

### `HELP.md`

你正在看的这个文件。

作用：

- 解释项目里每个文件是做什么的。
- 帮助你学习项目结构。
- 以后新增文件时，也在这里记录。

### `.gitignore`

Git 忽略文件。

作用：

- 告诉 Git 哪些文件不要上传到 GitHub。
- 例如 `node_modules/`、`dist/`、临时构建文件、环境变量文件。

### `vercel.json`

Vercel 部署配置文件。

作用：

- 告诉 Vercel 使用 `npm run build` 构建项目。
- 告诉 Vercel 构建后的网页在 `dist` 文件夹里。

### `netlify.toml`

Netlify 部署配置文件。

作用：

- 告诉 Netlify 使用 `npm run build` 构建项目。
- 告诉 Netlify 发布 `dist` 文件夹。

### `PRD.md`

产品需求文档。

作用：

- 说明 TodoList 网站要做什么。
- 记录功能需求，比如新增任务、编辑任务、删除任务、筛选任务、本地保存。
- 写代码前可以先看这个文件，明确目标。

### `package.json`

项目配置文件。

作用：

- 记录项目名称、版本。
- 记录项目需要哪些依赖，比如 React、Vite、TypeScript。
- 记录 TypeScript 需要的类型依赖，比如 `@types/react`。
- 记录可以运行的命令。

里面常用命令：

```json
"dev": "vite"
```

表示运行：

```bash
npm run dev
```

就会启动 Vite 本地开发服务器。

### `package-lock.json`

npm 自动生成的依赖锁定文件。

作用：

- 记录每个依赖的准确版本。
- 让别人安装依赖时，尽量装到和你一样的版本。

这个文件一般不要手动修改。

### `node_modules/`

npm 安装依赖后生成的文件夹。

作用：

- 存放 React、Vite、TypeScript 等第三方代码。
- 项目运行时会用到这里面的包。

这个文件夹通常很大。

这个文件夹不要手动修改。

### `index.html`

网站的 HTML 入口文件。

作用：

- 浏览器最先加载这个文件。
- 里面有一个 `<div id="root"></div>`。
- React 会把整个 TodoList 页面放进这个 `root` 里面。

关键代码：

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

意思是：页面从 `src/main.tsx` 开始运行。

### `vite.config.ts`

Vite 配置文件。

作用：

- 告诉 Vite 这个项目使用 React。
- 一般新手阶段很少需要改它。

### `tsconfig.json`

TypeScript 配置文件。

作用：

- 告诉 TypeScript 怎样检查 `src/` 里的代码。
- 比如是否开启严格检查、是否支持 React JSX 语法。

新手阶段一般不需要改它。

### `tsconfig.node.json`

给 Node 环境使用的 TypeScript 配置文件。

作用：

- 主要给 `vite.config.ts` 这类配置文件使用。
- 和页面代码关系不大。

新手阶段一般不需要改它。

### `src/`

源码文件夹。

作用：

- 放真正的网站代码。
- 以后新增 React 组件、工具函数、样式文件，通常都放在这里。

### `src/main.tsx`

React 程序入口文件。

作用：

- 找到 `index.html` 里的 `root`。
- 把 `App` 组件渲染到页面上。
- 引入全局样式 `style.css`。

你可以理解为：这个文件负责“启动 React”。

### `src/vite-env.d.ts`

Vite 类型声明文件。

作用：

- 告诉 TypeScript 这是一个 Vite 项目。
- 让 TypeScript 能认识 CSS 导入等 Vite 支持的写法。

这个文件一般不需要修改。

### `src/App.tsx`

TodoList 主页面组件。

作用：

- 显示页面标题。
- 新增任务。
- 展示任务列表。
- 标记任务完成或未完成。
- 编辑任务，支持点击保存、按 Enter 保存、按 Esc 取消。
- 删除任务。
- 阻止添加空任务。
- 按全部、未完成、已完成筛选任务。
- 显示总任务、未完成任务、已完成任务数量。
- 支持清除已完成任务，没有已完成任务时按钮会禁用。
- 使用 `localStorage` 保存任务，刷新页面后继续显示。
- 在标题区域显示一个用 CSS 画出来的小熊猫装饰。

目前大部分业务逻辑都在这个文件里。

为了方便 0 基础学习，项目先没有拆成很多小组件。

`localStorage` 在这个文件里的用法：

- 页面第一次打开时，通过 `localStorage.getItem('todolist-todos')` 读取保存过的任务。
- 读取出来的是字符串，所以用 `JSON.parse()` 转回数组。
- 如果保存的数据格式坏了，代码会返回空数组，避免页面直接崩掉。
- 每次任务数组 `todos` 变化时，用 `JSON.stringify(todos)` 把数组转成字符串。
- 再通过 `localStorage.setItem('todolist-todos', 字符串)` 保存到浏览器。

### `src/style.css`

网站样式文件。

作用：

- 控制页面布局。
- 控制颜色、按钮、输入框、任务列表样式。
- 控制手机屏幕下的显示效果。

如果你想调整页面长什么样，通常先看这个文件。

现在的小熊猫也是在这个文件里画出来的。

相关样式名：

- `.panda`
- `.panda-ear`
- `.panda-face`
- `.panda-eye`
- `.panda-nose`
- `.panda-mouth`

## 新手学习顺序

建议按这个顺序看：

1. 先看 `PRD.md`，知道产品要做什么。
2. 再看 `index.html`，知道网页入口在哪里。
3. 再看 `src/main.tsx`，知道 React 从哪里启动。
4. 重点看 `src/App.tsx`，理解 TodoList 功能怎么写。
5. 最后看 `src/style.css`，理解页面为什么长这样。

## 以后新增文件时怎么记录

如果以后新增了文件，请在这个文件里补充：

```text
### `文件路径`

作用：

- 这个文件负责什么。
- 为什么需要它。
- 新手应该重点看哪里。
```
