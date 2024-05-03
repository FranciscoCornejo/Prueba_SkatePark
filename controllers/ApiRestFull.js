//ApiRestFull.js
import express from "express";
const app = express();

import path from "path";
const __dirname = path.resolve();
import jwt from "jsonwebtoken";

import {
  addSkaterQuery,
  getSkatersQuery,
  getSkaterByEmailQuery,
  updateSkaterByEmailQuery,
  deleteSkaterByEmailQuery,
  setUsuarioStatus,
} from "../querys/consultaSQL.js";

// import configuracionMiddleware from "../middlewares/middleware.js";
// configuracionMiddleware(app);

const homeControl = async (req, res) => {
  try {
    const skaters = await getSkatersQuery();
    res.render("Home", { skaters });
  } catch (error) {
    console.error("Error al obtener la lista de skaters:", error.message);
    res
      .status(500)
      .send("Error al obtener la lista de skaters: " + error.message);
  }
};
const addSkaterControl = async (req, res) => {
  console.log("pikachu", req.body);
  try {
    const { email, nombre, password, anos_experiencia, especialidad } =
      req.body;
    const { foto } = req.files;

    if (!foto) {
      throw new Error("No se ha proporcionado un archivo de imagen");
    }

    const { name } = foto;
    const pathPhoto = `img/${name}`;

    foto.mv(`${__dirname}/assets/${pathPhoto}`, async (err) => {
      if (err) {
        throw new Error("Error al cargar la imagen");
      }
      const skater = {
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        foto: pathPhoto,
      };
      await addSkaterQuery(skater);
      res.status(201).redirect("/login");
    });
  } catch (error) {
    console.error("Error al añadir skater:", error);
    res.status(500).send(error.message);
  }
};

const getLoginControl = async (req, res) => {
  try {
    res.render("Login");
  } catch (error) {
    console.error(
      "Error al cargar la vista de inicio de sesión:",
      error.message
    );
    res
      .status(500)
      .send("Ocurrió un error al cargar la vista de inicio de sesión");
  }
};
const postLoginControl = async (req, res) => {

  try {
    const { email, password } = req.body;
    const skater = await getSkaterByEmailQuery(email);



    if (!skater || skater.password !== password) {
      return res.status(401).send("Credenciales inválidas");
    }

    //crear token de validacion simple por header
    const token = jwt.sign(
      { userId: skater.id, email: skater.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    if (skater.rol === "user") {
      res.redirect(`/perfil/${skater.email}`);
    } else {
      res.redirect("/admin");
    }

    // if (skater.rol === "admin") {
    //   res.redirect("/admin");
    // } else {
    //   res.redirect(`/perfil/${skater.email}`);
    // }


    //rol de ingresos
    // if (skater.nombre === "admin") {
    //   // Si el usuario es "admin", lo identificamos como administrador
    //   const token = jwt.sign(
    //     { userId: skater.id, email: skater.email },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "1h" }
    //   );
    //   res.cookie("token", token);
    //   res.redirect("/admin"); // Redirige a la vista de administrador
    // } else {
    //   // Si el usuario es un usuario normal, lo redirigimos a la vista de perfil como se hace actualmente
    //   res.redirect(`/perfil/${skater.email}`);
    // }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res
      .status(500)
      .send("Ocurrió un error al iniciar sesión: " + error.message);
  }
};
const getPerfil = async (req, res) => {
  try {
    const { email } = req.params; // Cambiado de `id` a `email`

    // Obtiene el perfil del usuario por su correo electrónico
    const skater = await getSkaterByEmailQuery(email);

    if (!skater) {
      throw new Error("Usuario no encontrado");
    }
    res.render("Perfil", { skater }); //muestra perfil.hbs con la data
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res
      .status(500)
      .send("Error al obtener el perfil del usuario: " + error.message);
  }
};

const postPerfilControl = async (req, res) => {
  try {
    const { email } = req.params;
    const { action, ...updatedFields } = req.body;

    if (action === "update") {
      // Actualizar perfil utilizando el correo electrónico
      await updateSkaterByEmailQuery(email, updatedFields);
      res.status(200).send("Perfil actualizado correctamente."); // Agregar un mensaje de confirmación
    } else if (action === "delete") {
      // Eliminar perfil utilizando el correo electrónico
      await deleteSkaterByEmailQuery(email);
      res.status(200).send("Perfil eliminado correctamente."); // Agregar un mensaje de confirmación
    } else {
      res.status(400).send("Acción no válida.");
    }
  } catch (error) {
    console.error("Error en postPerfilControl:", error);
    res.status(500).send("Ocurrió un error en el servidor.");
  }
};
const getAdmin = async (req, res) => {
  try {
    console.log("Obteniendo lista de skaters para el administrador...");
    const skaters = await getSkatersQuery();
    console.log("Lista de skaters obtenida con éxito.");
    res.render("Admin", { skaters });
  } catch (error) {
    console.error("Error al obtener la lista de skaters:", error.message);
    res
      .status(500)
      .send("Error al obtener la lista de skaters: " + error.message);
  }
};
const putAdmin = async (req, res) => {
  const { estado } = req.body;
  const { id } = req.params; // Extrayendo el id de los parámetros de la URL
  try {
    console.log("Estado recibido:", estado);
    console.log("ID recibido:", id);
    const usuario = await setUsuarioStatus(estado, id);
    console.log("Usuario actualizado:", usuario);
    res.status(200).send(usuario);
  } catch (e) {
    console.error("Error en putAdmin:", e);
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

const registroControl = (req, res) => {
  res.render("Registro");
};

export {
  homeControl,
  addSkaterControl,
  registroControl,
  getLoginControl,
  postLoginControl,
  getPerfil,
  postPerfilControl,
  getAdmin,
  putAdmin,
};
