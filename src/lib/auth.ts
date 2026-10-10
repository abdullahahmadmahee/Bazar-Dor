import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient };
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: true 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "PLACEHOLDER",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "PLACEHOLDER",
    },
  },
});