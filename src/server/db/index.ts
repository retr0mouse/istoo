import { QueryResult } from 'pg'
import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})

export const query = async (text: string, params?: any): Promise<QueryResult<any>> => {
    client.query(text, (error, results) => {
        if (error) {
            console.log("oshibka");
            throw error;
        }
        return results;
    });
    return {} as QueryResult<any>;
}
