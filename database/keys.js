require("dotenv").config();

module.exports = {
    database: {
        host: process.env.HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'sedeso_test'
    }    
};