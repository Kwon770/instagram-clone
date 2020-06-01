// To read .env file
import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleawares";
import { uploadMiddleware, uploadController } from "./upload";

// Adding all setting to env is good code
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

// Graphql has express => you can use express by graphql
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅ running on https://localhost:${PORT}`)
);
