require('dotenv').config();
import path from "path";
import { Config } from "knex";

const {
	SUPER_DICT_POSTGRES_HOST,
	SUPER_DICT_POSTGRES_DATABASE,
	SUPER_DICT_POSTGRES_USERNAME,
	SUPER_DICT_POSTGRES_PASSWORD,
	SUPER_DICT_POSTGRES_PORT,
	SUPER_DICT_POSTGRES_SSL,
} = process.env;

const databaseDirectory = path.resolve(__dirname, 'src', 'database')
const migrationDirectory = path.join(databaseDirectory, 'migrations');
const seedsDirectory = path.join(databaseDirectory, 'seeds');

const knexConfig: Config = {
	client: 'postgresql',
	connection: {
		host: SUPER_DICT_POSTGRES_HOST,
		database: SUPER_DICT_POSTGRES_DATABASE,
		user: SUPER_DICT_POSTGRES_USERNAME,
		password: SUPER_DICT_POSTGRES_PASSWORD,
		port: Number(SUPER_DICT_POSTGRES_PORT),
		ssl: SUPER_DICT_POSTGRES_SSL === 'true',
	},
	pool: {
		min: 1,
		max: 1,
	},
	migrations: {
		directory: migrationDirectory,
		tableName: 'knex_migrations_new',
	},
	seeds: {
		directory: seedsDirectory,
	},
}

module.exports = {
	test: knexConfig,
	development: knexConfig,
	production: knexConfig,
	migration: knexConfig,
	staging: knexConfig,
}