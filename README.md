# Instagram Clone | 🖥Web and 📱App

## Setup

```bash
$ yarn add graphql-yoga dotenv morgan graphql-tools merge-graphql-schemas
$ yarn add nodemon babel-node @babel/node @babel/preset-env @babel/core
```

- nodemon: Execute saved file without restarting server
- dotenv: Read .env file
- morgan: Logger, To Monitor server pulling
- graphql-tools merge-graphql-schemas: The tool what is needed to manage lot of files related with graphql [Reference](https://github.com/Kwon770/instagram-clone/blob/master/src/server.js)
- babel-node: Convert code to be compatible

### nodemon || babel

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

### dotenv

```js
// server.js
require("dotenv").config();
```

### Study Document
