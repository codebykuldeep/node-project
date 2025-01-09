import Client from './db.js';

const db = new Client();




async function organizationSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS organization (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        description VARCHAR,
        payment_id VARCHAR,
        payment_url VARCHAR,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        status BOOLEAN DEFAULT true
      )`)
    
    
}

async function superAdminSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS super_admin (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP
      )`)
    
    
}

async function adminSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        status BOOLEAN DEFAULT true,
        organization_id INTEGER,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(organization_id) REFERENCES organization(id) ON DELETE CASCADE
      )`)
    
    
}

async function userSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        status BOOLEAN DEFAULT true,
        interest INTEGER,
        organization_id INTEGER,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(organization_id) REFERENCES organization(id) ON DELETE CASCADE
      )`)
    
    
}

async function transactionSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        transaction_id uuid default gen_random_uuid(),
        amount INTEGER,
        image_url VARCHAR,
        approved BOOLEAN DEFAULT false,
        organization_id INTEGER,
        user_id INTEGER,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(organization_id) REFERENCES organization(id) ON DELETE CASCADE
      )`)
    
}

async function setupDb(){
    await organizationSchema();
    await superAdminSchema();
    await adminSchema();
    await userSchema();
    await transactionSchema();
}

async function connectDb() {
    db.connect({
        host:'localhost',
        port:5432,
        database:'money-db',
        user:'postgres',
        password:'root'
    })
    console.log('DB CONNECTED!');
    await setupDb();
}

export { db ,connectDb};