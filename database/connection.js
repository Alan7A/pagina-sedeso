const mysql = require("mysql2");
const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if (error) { 
        if (error.code === 'PROTOCOL_CONNECTION_LOST')
            console.error("Se perdió la conexión con la base de datos");

        else if (error.code === 'ER_CON_COUNT_ERROR')
            console.error("Hay demasiadas conexiones en la base de datos");
    
        else if (error.code === 'ECONNREFUSED')
            console.error("Conexión rechazada");
        
        else
            console.error("Error al conectar a la base de datos: ", error);

        return;
    }

    connection.release();

    // Mensaje de conexión
    return console.log("Conectado a la base de datos");
});

// Exportación del modulo
module.exports = pool.promise();
