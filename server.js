const express = require('express');
const validarJwt = require('./middlewares/validar-jwt');
require('dotenv').config();
// const cors = require('cors')

// Inicializar express
const app = express();

// Midddlewares
// app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Rutas
app.use('/api/usuarios', validarJwt, require('./routes/usuarios.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
