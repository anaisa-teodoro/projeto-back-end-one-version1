

const locaisRoutes = require("express").Router();
const {plataforma, update, status, index, indexId, deleteId} = require('../controllers/locais.controllers');
const { validarToken } = require("../middlewares/auth");
//endpoints protegidos por token
locaisRoutes.post("/api/locais",validarToken,plataforma);
locaisRoutes.patch("/api/locais/:id",validarToken,update);
locaisRoutes.patch("/api/locais/:id/status",validarToken,status)
locaisRoutes.get("/api/locais",validarToken,index)
locaisRoutes.get("/api/locais/:id",validarToken,indexId)
locaisRoutes.delete("/api/locais/:id",validarToken,deleteId)
locaisRoutes.get("/api/locais/map",validarToken,indexId)


module.exports = locaisRoutes;
