//2
import express from "express";
const router = express.Router();

import {
  homeControl,
  addSkaterControl,
  registroControl,
  getLoginControl,
  postLoginControl,
  getPerfil,
  postPerfilControl,
  getAdmin,
  putAdmin,
} from "../controllers/ApiRestFull.js";
//import { verifyToken } from "../middlewares/auth.js";

// Ruta por defecto para la página de inicio
router.get("/", homeControl);

// Rutas para el controlador de skaters
router.post("/skaters", addSkaterControl);

// Rutas para el controlador de registro
router.get("/registro", registroControl); // Renderizado de la vista de registro

// Rutas para el controlador de inicio de sesión
router.get("/login", getLoginControl); // Renderizado de la vista de inicio de sesión
router.post("/login", postLoginControl); // Procesamiento del inicio de sesión

// Ruta para el controlador de perfil
router.get("/perfil/:email", getPerfil); //muestra
router.post("/perfil/:email", postPerfilControl); // edita o elimina

// Rutas para el controlador de administrador
router.get("/admin", getAdmin);
router.put("/skaters/status/:id", putAdmin); //actualizar estado desde vista admin

export default router;
