import dotenv from "dotenv";
import knex from "knex";
dotenv.config();

const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWRORD,
        database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_DEV_NAME,
    },
    useNullAsDefault: true,
});

export default connection;