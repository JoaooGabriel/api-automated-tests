// Update with your config settings.
import config from "./src/config/config";

export default {
  development: {
    client: config.dbDialect || "mysql",
    connection: {
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbSchema || "app",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/database/migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: config.dbDialect || "sqlite",
    connection: {
      filename: config.dbSchema || "tests/database/database.sqlite",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/database/migrations",
    },
    useNullAsDefault: true,
  },

  production: {},
};
