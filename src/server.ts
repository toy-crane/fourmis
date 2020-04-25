import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import * as logger from "morgan";
import { permissions } from "./permissions/index";
import * as passport from "passport";
import { createContext } from "./context";

const PORT = process.env.PORT;
passport.initialize();
const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: createContext
});
server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
server.express.use(logger("dev"));
