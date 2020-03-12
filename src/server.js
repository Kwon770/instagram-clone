// To read .env file
require("dotenv").config();
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
