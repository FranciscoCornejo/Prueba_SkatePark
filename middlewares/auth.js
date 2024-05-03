import jwt from "jsonwebtoken";

/// Middleware para verificar el token JWT
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token; // Recupera el token de la cookie
//   console.log("verifying token", token);
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     // res.status(401).json({ message: 'Not authorized, no token' });
//     res.redirect("/nooo");
//   }
// };
// Middleware para manejar rutas restringidas
// const restrictedRoute = (req, res) => {
//   res.status(403).render("access_denied"); // Renderiza la página de acceso restringido
// };
// Exportar middleware y funciones
// export { verifyToken, restrictedRoute };
