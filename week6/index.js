import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieSchema from "./schemas/schema.js";
import movieResolvers from "./resolvers/resolvers.js";
import mongoose from "mongoose";

//import ApolloServer
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
// Express app
const app = express();

dotenv.config();

const DB_NAME = "wk5";
const DB_USER_NAME = "kroshinci_db_user";
const DB_PASSWORD = "uZqgLYs7rGgVwJEY";
const CLUSTER_ID = "qbpahzc";
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0&authSource=admin`;

const connectDB = async () => {
  await mongoose.connect(DB_CONNECTION);
};

async function startServer() {
  //Define Apollo Server
  const server = new ApolloServer({
    typeDefs: movieSchema,
    resolvers: movieResolvers,
  });

  //Start the Apollo Server
  await server.start();

  //Apply middleware to the Express app
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  //Start Express server
  app.listen(process.env.PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`,
    );
    //Connect to MongoDB Atlas
    try {
      connectDB();
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.log(`Unable to connect to DB : ${error.message}`);
    }
  });
}

startServer();
