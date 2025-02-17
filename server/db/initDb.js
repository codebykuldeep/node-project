import Client from './db.js';

const db = new Client();




async function organizationSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS organization (
        organization_id SERIAL PRIMARY KEY,
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
        super_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP
      )`)
    
    
}

async function adminSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS admin (
        admin_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        status BOOLEAN DEFAULT true,
        organization_id INTEGER,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
      )`)
    
    
}

async function userSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL, 
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        number VARCHAR,
        status BOOLEAN DEFAULT true,
        amount INTEGER DEFAULT 0,
        interest INTEGER,
        organization_id INTEGER,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
      )`)
    
    
}

async function transactionSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS transactions (
        transaction_id uuid default gen_random_uuid() PRIMARY KEY,
        amount INTEGER,
        image_url VARCHAR,
        approved BOOLEAN DEFAULT NULL,
        organization_id INTEGER,
        user_id INTEGER,
        payment_type BOOLEAN DEFAULT true NOT NULL,
        remark VARCHAR DEFAULT '',
        date VARCHAR DEFAULT CURRENT_TIMESTAMP,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY(organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
      )`)
    
}

async function withDrawalSchema() {
    await db.query(`CREATE TABLE IF NOT EXISTS withdrawals (
        withdrawal_id uuid default gen_random_uuid() PRIMARY KEY,
        amount INTEGER,
        remark VARCHAR DEFAULT '',
        approved BOOLEAN DEFAULT NULL,
        organization_id INTEGER,
        user_id INTEGER,
        date VARCHAR DEFAULT CURRENT_TIMESTAMP,
        created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY(organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
      )`)
    
}

async function setupDb(){
    await organizationSchema();
    await superAdminSchema();
    await adminSchema();
    await userSchema();
    await transactionSchema();
    await withDrawalSchema();
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