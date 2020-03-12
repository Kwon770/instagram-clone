# Instagram Clone | 🖥Web and 📱App

## Setup

```bash
$ yarn add graphql-yoga dotenv
$ yarn add nodemon babel-node @babel/node @babel/preset-env @babel/core
```

- nodemon: The tool to execute saved file without restarting server
- dotenv: The tool to read .env file
- babel-node: The tool to convert code to be compatible

```json
// package.json
"scripts": {
    // execute server.js with babel-node
    "dev": "nodemon --exec babel-node src/server.js"
  }
```

```json
// nodemon.json
// nodemon 감시할 파일의 확장자 지정
{
  "ext": "js graphql"
}
```

```json
// .babelrc
// To make node detect import (import { GraphQLServer } from "graphql-yoga";)
{
  "presets": ["@babel/preset-env"]
}
```

```js
// server.js
require("dotenv").config();
```
