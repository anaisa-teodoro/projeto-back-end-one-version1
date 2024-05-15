

const locaisRoutes = require("express").Router();
const {plataforma, index, indexId,update,status,deleteId,indexMaps} = require('../controllers/locais.controllers');
const { validarToken } = require("../middlewares/auth");

//endpoints protegidos por token
locaisRoutes.post("/api/local",validarToken,plataforma);
locaisRoutes.get("/api/local",validarToken,index);
locaisRoutes.get("/api/local/:local_id",validarToken,indexId);
locaisRoutes.put("/api/local/:local_id",validarToken,update);
locaisRoutes.put("/api/local/:id/status",validarToken,status);
locaisRoutes.delete("/api/local/:local_id",validarToken,deleteId);
locaisRoutes.get("/api/local/:local_id/maps",validarToken,indexMaps);


module.exports = locaisRoutes;
