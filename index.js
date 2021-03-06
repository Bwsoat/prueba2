//manera nativa de exportar express dentro de una variable
const express = require("express");
//importamos las rutas del otro archivo
const routes = require("./routes");
//importamos helpers con algunas funciones
const helpers = require("./helpers");

//agregamos la libreria path
const path = require("path");

//creamos  la conexion a la DB

const db = require("./config/db");

//importamos el modelo sin la necesitas de usar un const
require("./models/Proyectos");
//usamos sync para crear nuestra tabla, authenticate para auntentificar la conexion
db.sync()
    .then(()=> console.log("Conectado al Servidor"))
    .catch(error => console.log(error));

//crea una app de express
const app = express();

//Donde cargar los archivos estaticos

app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");

//añadir la carpeta de vistas
app.set("views", path.join(__dirname, "./views"));

//pasar vardump a la aplicacion

app.use((req, res, next) =>{
    //usamos res.local para poder usar esta funcion en toda la aplicacion
    res.locals.vardump = helpers.vardump;
    next();
});

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//aqui utlizamos lo que exportamos
app.use("/", routes() );

//el puerto donde va a correr express
app.listen(3500);








