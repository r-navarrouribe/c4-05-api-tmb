require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");
const { llamadaAPI } = require("./datosAPI/datosAPI");

const app = express();

const puerto = process.env.PUERTO || 5000;

const server = app.listen(puerto, () => {
  console.log(`Servidor escuchando el puerto ${puerto}`);
});

server.on("error", (err) => {
  console.log(err.message);
  console.log("No se ha podido levantar el servidor");
  if (err.code === "EADDRINUSE") {
    console.log(`El puerto ${puerto} está ocupado`);
  }
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "recursos")));
app.use(express.json());

app.get("/metro/lineas", async (req, res, next) => {
  const datos = await llamadaAPI();
  const lineas = datos.features.map((linea) => ({
    id: linea.properties.ID_LINIA,
    linea: linea.properties.NOM_LINIA,
    descripcion: linea.properties.DESC_LINIA,
  }));
  res.json(lineas);
});
