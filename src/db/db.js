import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'

const { Pool } = pg

/* const user = 'postgres';
const password = '0043';
const host = 'localhost';
const port = 5432;
const database = 'shortly';*/

 const connection = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl:{
     rejectUnauthorized: false
   }
 });

/* const connection = new Pool({
user : 'postgres',
password : '03111999',
host : 'localhost',
port : 5432,
database : 'linktr'
}); */

export { connection }