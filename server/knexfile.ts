import dotenv from "dotenv";
import { Config } from "knex";
import path from "path";
dotenv.config();

interface KnexConfig {
	[name: string]: Config;
}

var knexConfig: KnexConfig = {
	development: {
		client: "pg",
		connection: {
			host : process.env.DB_HOST || "127.0.0.1",
			user : process.env.DB_USERNAME || "postgres",
			password :  process.env.DB_PASSWRORD || "123",
			database : process.env.DB_DEV_NAME || "stock_control"
		},
		migrations: {
			directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
			extension: "ts",
		},
	}
};

var environment = process.env.NODE_ENV || 'development';
var config = knexConfig[environment];

module.exports = config;