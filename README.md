# Instagram Clone | 🤖Server

## Tech Stack

|                  GraphQl Yoga                  |                    Apollo                     |                     Prisma                     |
| :--------------------------------------------: | :-------------------------------------------: | :--------------------------------------------: |
| <img src="./document/gq-yoga.png" width="200"> | <img src="./document/apollo.png" width="200"> | <img src="./document/prisma.jpeg" width="200"> |

|                   AWS S3                   |                     Heroku                     |                    Netlify                     |
| :----------------------------------------: | :--------------------------------------------: | :--------------------------------------------: |
| <img src="./document/aws.png" width="200"> | <img src="./document/heroku.jpeg" width="200"> | <img src="./document/netlify.png" width="200"> |

|                    Passport                     |                    Sendgrid                     |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="./document/passport.png" width="200"> | <img src="./document/sendgrid.png" width="200"> |

## Study Document

| Title         | Document                                |
| ------------- | --------------------------------------- |
| Basic Graphql | [Document](./document/basic-graphql.md) |
| Basic Prisma  | [Document](./document/basic-prisma.md)  |
| Graphql Api   | [Document](./document/graphql-api.md)   |

## Setup

```bash
$ yarn add graphql-yoga dotenv morgan graphql-tools merge-graphql-schemas
$ yarn add nodemon babel-node @babel/node @babel/preset-env @babel/core @babel/cli @bebel/runtime multer multer-s3 aws-sdk
$ yarn add @babel/plugin-transform-runtime -D
```

- nodemon: Execute saved file without restarting the server
- dotenv: Read .env file
- morgan: Logger, To Monitor server pulling
- graphql-tools merge-graphql-schemas: The tool what is needed to manage a lot of files related to GraphQL [Reference](https://github.com/Kwon770/instagram-clone/blob/master/src/server.js)
- babel-node: Convert code to be compatible
- multer: Middleware to upload files
- multer-s3: multer to upload amazon s3 server

### nodemon || babel

Execute server.js with babel-node

```json
// package.json
"scripts": {
    "dev": "nodemon --exec babel-node src/server.js"
  }
```

nodemon 감시할 파일의 확장자 지정

```json
// nodemon.json
{
  "ext": "js graphql"
}
```

To make node detect import (import { GraphQLServer } from "graphql-yoga";)

```json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

### dotenv

```js
// server.js
require("dotenv").config();
```
