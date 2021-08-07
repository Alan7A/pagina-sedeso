const express = require('express');
require('dotenv').config();
// const cors = require('cors')

// Inicializar express
const app = express();

// Midddlewares
// app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
