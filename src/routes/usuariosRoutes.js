const usuariosRoutes = require("express").Router();
const {
  plataforma,
  login,
  update,
  status,
  senha,
  index,
} = require("../controllers/usuarios.controllers");


const { validarToken } = require("../middlewares/auth");

//endpoints publicos
usuariosRoutes.post("/api/usuarios", plataforma);
usuariosRoutes.post("/api/usuarios/login", login);
//endpoinst protegidos por token
usuariosRoutes.patch("/api/usuarios/:id", validarToken, update);
usuariosRoutes.patch("/api/usuarios/:id/status", validarToken, status);
usuariosRoutes.patch("/api/usuarios/:id/senha", validarToken, senha);
usuariosRoutes.get("/api/usuarios/:id", validarToken, index);

module.exports = usuariosRoutes;
