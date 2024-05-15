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

//endpoints públicos
usuariosRoutes.post("/api/usuario", plataforma);
usuariosRoutes.post("/api/usuarios/login", login);
//endpoinst protegidos por validação de token
usuariosRoutes.put("/api/usuarios/:id", validarToken, update);
usuariosRoutes.put("/api/usuarios/:id/status", validarToken, status);
usuariosRoutes.put("/api/usuarios/:id/senha", validarToken, senha);
usuariosRoutes.get("/api/usuarios/:id", validarToken, index);

module.exports = usuariosRoutes;
