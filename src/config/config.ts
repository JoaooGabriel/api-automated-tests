import dotenv from "dotenv";

dotenv.config({
  path: process.env["NODE_ENV"] === "test" ? ".env.test" : ".env",
});

const serverPort = process.env["SERVER_PORT"];
const secretToken = process.env["SECRET_TOKEN"];
const timeExpiredToken = process.env["SECRET_TOKEN_EXPIRED_TIME"]
const dbHost = process.env["DB_HOST"] || "localhost";
const dbPort = process.env["DB_PORT"];
const dbDialect = process.env["DB_DIALECT"];
const dbSchema = process.env["DB_SCHEMA"];
const dbUser = process.env["DB_USER"] || "root";
const dbPassword = process.env["DB_PASSWORD"] || "";

const config = {
  serverPort,
  secretToken,
  timeExpiredToken,
  dbHost,
  dbPort: parseInt(dbPort as string),
  dbDialect,
  dbSchema,
  dbUser,
  dbPassword,
};

export default config;
