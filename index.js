//1. Crear un servidor con Express en el puerto 3000.
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRandomNumber from './utilities/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PUERTO = 3000;
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', 'Ignacia', 'Javier', 'Brian'];
console.clear();

//2. Definir la carpeta “assets” como carpeta pública del servidor.
// Middleware para archivos estáticos desde la carpeta "public/assets"
app.use(express.static('public/assets'));

//3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
// Ruta para devolver los usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.send({ usuarios });
});


//4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.
// Middleware para validar la existencia del usuario
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    usuarios.includes(usuario) ? next() : res.sendFile(__dirname + '/public/who.jpeg');
});

// Ruta para la página de juego si el usuario es válido
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


//5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria.En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
// Ruta para validar si el número coincide con el generado aleatoriamente
app.get('/abracadabra/conejo/:n', (req, res) => {
    const number = req.params.n;
    number == getRandomNumber() ? res.sendFile(__dirname + '/public/assets/conejito.jpg') : res.sendFile(__dirname + '/public/assets/voldemort.jpg');
});


//6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
// Ruta genérica para manejar solicitudes a rutas no encontradas
app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/public/error_404.html');
});

// Iniciar el servidor en el puerto especificado
app.listen(PUERTO, () => console.log(`Servidor arriba en el puerto ${PUERTO}`));
