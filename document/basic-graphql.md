# Basic Graphql

## Server code

```js
// To read .env file
// require("dotenv").config();
// Default path of 'config()' is the folder of project, so must change
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

// Adding all setting to env is good code
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// Graphql has express => you can use express by graphql
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅ running on https://localhost:${PORT}`)
);
```

## Basic graphql and resolvers files (request file)

sayHello.graphql

```graphql
type Query {
  sayHello: String!
}
```

sayHello.js

```js
export default {
  Query: {
    sayHello: () => "Hello"
  }
};
```

## Managing graphql and resolvers files (request file)

### File Directory Structure

```
src
    - .env : setting file of server
    - server.js : server file
    - schema.js : The file to combine all request files
    > api : The folder to save all requst files
        > Greeting (example)
            > sayHello (example)
                - sayHello.graphql : graphql file what have Query
                - sayHello.js : resolvers file
```

### schema.js

```js
// There is lot of graphql and resolvers files
// And They will be combined from here
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// Must not add files that isn't graphql or resolvers
const allTypes = fileLoader(path.join(__dirname, "./api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
```
