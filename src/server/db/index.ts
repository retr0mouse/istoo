import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
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
