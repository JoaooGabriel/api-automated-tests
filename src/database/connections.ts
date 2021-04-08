import knex from "knex";

import configuration from "../../knexfile";

const environment = process.env["NODE_ENV"] === "test" ? configuration.test : configuration.development;

const connection = knex(environment);

export default connection;