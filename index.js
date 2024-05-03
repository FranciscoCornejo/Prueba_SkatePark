//1
//configuracion del servidor
import express from "express";
const app = express();
const port = process.env.port || 3000;

import router from "./routes/router.js";
import configuracionMiddleware from "./middlewares/middleware.js";

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
configuracionMiddleware(app);

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});


