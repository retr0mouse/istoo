import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';
const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASENAME,
    password: process.env.DBPASSWORD,
    port: Number(process.env.DBPORT),
})

export const query = async (text: string, params?: any) => {
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    })

    const client = await pool.connect();
    const res = await client.query(text, params);

    client.release();
    return res;
}
