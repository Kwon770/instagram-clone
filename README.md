# Instagram Clone | 🖥Web and 📱App

## Setup

```bash
$ yarn add graphql-yoga
$ yarn add nodemon babel-node babel-cli
```

- nodemon: The tool to execute saved file without restarting server
- babel-node: The tool to convert code to be compatible

```json
// package.json
"scripts": {
    // execute server.js with babel-node
    "dev": "nodemon --exec babel-node src/server.js"
  }
```