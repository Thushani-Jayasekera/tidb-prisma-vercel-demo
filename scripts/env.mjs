import getConfig from "next/config";

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

if(TIDB_USER && TIDB_HOST && TIDB_PORT) {
    console.log(`mysql://${TIDB_USER}:${TIDB_PASSWORD}@${TIDB_HOST}:${TIDB_PORT}/${TIDB_DB_NAME}?${SSL_FLAGS}`);
} else {
    console.log(`${DATABASE_URL}?${SSL_FLAGS}`);
}