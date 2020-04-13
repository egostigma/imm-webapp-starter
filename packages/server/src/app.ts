import express from "express";
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import { startDB } from "./db";
import schema from "./schema/schema";
import {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOSTNAME,
  MONGODB_PORT,
  MONGODB_DB
} from "./util/secrets";

startDB({
  user: MONGODB_USER,
  password: MONGODB_PASSWORD,
  hostname: MONGODB_HOSTNAME,
  port: MONGODB_PORT,
  db: MONGODB_DB
});

const app = express();

const server = new ApolloServer({
  schema: schema
});

app.use("*", cors());
app.use(compression());

server.applyMiddleware({ app, path: "/" });

app.set("port", process.env.PORT || 3000);
// app.use("/", bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

export default app;
