// To read .env file
require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

// Adding all setting to env is good code
const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hi"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () =>
  console.log(`Server running on https://localhost:${PORT}`)
);
