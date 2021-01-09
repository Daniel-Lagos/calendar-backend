const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el Servidor de express

const app = express();

//Base de datos

//MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
dbConnection();

//Cors
app.use(cors());

//Directorio Publico

app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas

/*app.get('/', (req, res) => {
    console.log('Se Requiere /');
    res.json({
        ok: true
    });
})*/
//Esta ruta esta bien en esta parte del proyecto porque solo hay una ruta

//Ejemplo para muchas rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//TODO: CRUD: Evento

//Escuchar Peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor Corriendo en Puerto ${process.env.PORT}`);
})