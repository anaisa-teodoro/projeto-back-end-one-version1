// dependencias
const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const morgan = require("morgan");
config();
//rotas
const rotas = require('./routes/index');
class Server { 
  constructor(app = express()) {
    app.use(morgan('dev'));
    app.use(cors(
      
    ));

    this.router(app);
    this.database();
    this.initializeServer(app);
  }
  // connect database
  async database() {
    const connection = require("../database/connection");
    try {
      await connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Não foi possível conectar com o banco de dados:", error.message);
    }
  }
  //router
  async router(app) {
    app.use(express.json());
    app.use(rotas);
  }
  // start server
  async initializeServer(app) {
    const PORT = process.env.NODE_PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor executando em http://localhost:${PORT}/`));
  }

}

module.exports = { Server };
