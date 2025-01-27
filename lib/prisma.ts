import { PrismaClient } from "@prisma/client";
import getConfig from "next/config";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  interface BigInt {
    toJSON(): string;
  }
}

let prisma: PrismaClient

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();



// const { TIDB_USER, TIDB_PASSWORD, TIDB_HOST, TIDB_PORT, TIDB_DB_NAME = 'bookshop', DATABASE_URL } = process.env;
const TIDB_USER = publicRuntimeConfig.TIDB_USER;
const TIDB_PASSWORD = publicRuntimeConfig.TIDB_PASSWORD;
const TIDB_HOST = publicRuntimeConfig.TIDB_HOST;
const TIDB_PORT = publicRuntimeConfig.TIDB_PORT;
const TIDB_DB_NAME = publicRuntimeConfig.TIDB_DB_NAME;
const DATABASE_URL = publicRuntimeConfig.DATABASE_URL;
// Notice: When using TiDb Cloud Serverless Tier, you **MUST** set the following flags to enable tls connection.
const SSL_FLAGS = 'pool_timeout=60&sslaccept=accept_invalid_certs';
const databaseURL = DATABASE_URL
    ? `${DATABASE_URL}?${SSL_FLAGS}`
    : `mysql://${TIDB_USER}:${TIDB_PASSWORD}@${TIDB_HOST}:${TIDB_PORT}/${TIDB_DB_NAME}?${SSL_FLAGS}`;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseURL,
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseURL,
        },
      },
    });
  }
  prisma = global.prisma
}

BigInt.prototype.toJSON = function() {       
  return this.toString()
}

export default prisma
