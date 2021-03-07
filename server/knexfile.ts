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
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWRORD,
			database: process.env.DB_DEV_NAME,
		},
		migrations: {
			directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
			extension: "ts",
		},
		seeds: {
			directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
			extension: "ts",
		}
	},
	test: {
		client: "pg",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWRORD,
			database: process.env.DB_TEST_NAME,
		},
		migrations: {
			directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
			extension: "ts",
		},
		seeds: {
			directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
			extension: "ts",
		}
	}
};

var environment = process.env.NODE_ENV || 'development';
var config = knexConfig[environment];

module.exports = config;