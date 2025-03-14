require("dotenv").config();
const { Pool } = require("pg");

let pool
try{
    pool = new Pool(process.env.URI_DB 
        ? {connectionString:process.env.URI_DB} 
        : {
            user: process.env.DB_USER || "user",
            host: process.env.DB_HOST || "localhost",
            database: process.env.DB_NAME || "cd_database",
            password: process.env.DB_PASSWORD || "password",
            port: process.env.DB_PORT || 5432,
        }
    );
    pool.connect()
    .then(() => console.log("🟢 Connexion PostgreSQL réussie"))
    .catch(err => console.error("🔴 Erreur de connexion PostgreSQL:", err));
}
catch(e){
    console.error(e)
    process.exit(1)
}


module.exports = pool;
