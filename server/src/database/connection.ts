import dotenv from "dotenv";
import knex from "knex";
dotenv.config();

const connection = knex({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST || "127.0.0.1",
        user : process.env.DB_USERNAME || "postgres",
        password :  process.env.DB_PASSWRORD || "123",
        database : process.env.DB_DEV_NAME || "stock_control"
    },
    useNullAsDefault: true,
});

export default connection;