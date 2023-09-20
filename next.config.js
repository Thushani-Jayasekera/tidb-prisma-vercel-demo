// next.config.js
module.exports = {
  images: {
    domains: ["picsum.photos"],
  },
  publicRuntimeConfig:{ 
    DATABASE_URL : process.env.DATABASE_URL,
    TIDB_USER : process.env.TIDB_USER,
    TIDB_PASSWORD : process.env.TIDB_PASSWORD,
    TIDB_HOST :process.env.TIDB_HOST,
    TIDB_PORT : process.env.TIDB_PORT,
    TIDB_DB_NAME: process.env.TIDB_DB_NAME,
  }
};
