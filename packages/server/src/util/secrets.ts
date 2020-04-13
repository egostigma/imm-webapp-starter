import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
// export const MONGODB_URI = prod
//   ? process.env["MONGODB_URI"]
//   : process.env["MONGODB_URI_LOCAL"];
export const MONGODB_USER = process.env["MONGODB_USER"];
export const MONGODB_PASSWORD = process.env["MONGODB_PASSWORD"];
export const MONGODB_HOSTNAME = process.env["MONGODB_HOSTNAME"];
export const MONGODB_PORT = process.env["MONGODB_PORT"];
export const MONGODB_DB = process.env["MONGODB_DB"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (
  !MONGODB_HOSTNAME &&
  !MONGODB_PORT &&
  !MONGODB_DB
) {
  logger.error(
    "No mongo connection string. Set MONGODB_ environment variable."
  );
  process.exit(1);
}
