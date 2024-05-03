// middlewares.js
import express from "express";

import path from "path";
const __dirname = import.meta.dirname; //front

import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

export default function configuracionMiddleware(app) {
  // Middleware para archivos estáticos
  app.use(express.static(path.join(__dirname, "../assets")));
  app.use(
    "/css",
    express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
  );

  // Middleware para carga de archivos
  app.use(
    fileUpload({
      limits: 5000000,
      abortOnLimit: true,
      responseOnLimit: "El tamaño de la imagen supera el límite permitido",
    })
  );

  app.use(bodyParser.json());

  app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).send("Ha ocurrido un error en el servidor");
  });

  // Motor de plantilla - Handlebars
  app.engine(
    "hbs",
    engine({
      defaultLayout: "main",
      extname: "hbs",
      layoutsDir: path.join(__dirname, "../views/layouts"),
    })
  );
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "../views"));
}
