require("dotenv").config();
const fetch = require("node-fetch");

const llamadaAPI = async () => {
  const urlAPI = `${process.env.API_LINEAS}?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
  debugger;
  const resp = await fetch(urlAPI);
  debugger;
  const datosResp = await resp.json();
  return datosResp;
};

module.exports = {
  llamadaAPI,
};
