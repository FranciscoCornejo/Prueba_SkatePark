import pkg from "pg";
const { Pool } = pkg;

//nueva forma de importar dotenv
//process.loadEnvFile(); //se comenta para desplegar en render y se utiliza la forma anterior a la version 21 de node

import dotenv from "dotenv";
dotenv.config();

//desestructuramos las variables de entorno
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

//creamos el objeto de configuracion
const config = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  allowExitOnIdle: true, //con esta instruccion luego de realizar la consulta cancelamos la coneccion
};

//creamos el pool
const pool = new Pool(config);

export default pool;
