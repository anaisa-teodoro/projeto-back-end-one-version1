const Sequelize = require("sequelize");
const connection = require("./database/connection");
const { validaEmail } = require("./libs/validators")
const Localidades = require("./Localidades");
const LocalidadeLocal = require("./LocalidadeLocal");
const Usuarios = require("./Usuarios");

const Locais = connection.define(
  "local",
  {
    usuario_id: {
      type: Sequelize.INTEGER,
    },
    nome_local: {
      type: Sequelize.STRING,
    },
    cpf: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [14, 14],
          msg: "O CPF deve ter 14 caracteres",
        },
        isNumeric: {
          args: true,
          msg: "O CPF deve conter apenas números e não deve conter pontos ou traços",
        },

      },
    },
     
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validaEmail,
      },
    },
    telefone: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "O telefone deve conter apenas números e não deve conter pontos ou traços",
        },
      },
    },
    celular: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "O celular deve conter apenas números e não deve conter pontos ou traços",
        },
      },
    },
    cep: { type: Sequelize.STRING},
    logradouro: { type: Sequelize.STRING },
    numero: { type: Sequelize.STRING },
    bairro: { type: Sequelize.STRING },
    cidade: { type: Sequelize.STRING },
    estado: { type: Sequelize.STRING},
    complemento: { type: Sequelize.STRING },
    lat: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Latitude deve ser numérico, exemplo : -27.6019"
        }
      }
    },
    lon: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Longitude deve ser numérico, exemplo : -48.4703"
        }
      }
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "ativo",
      validate: {
        isIn: {
          args: [["ativo", "inativo"]],
          msg: "O status deve ser ativo ou inativo",
        },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

Localidades.belongsToMany(Locais, { through: LocalidadeLocal });
Locais.belongsToMany(Localidades, { through: LocalidadeLocal});

Localidades.hasMany(LocalidadeLocal);
Locais.hasMany(LocalidadeLocal);

LocalidadeLocal.belongsTo(Localidades);
LocalidadeLocal.belongsTo(Locais);

Locais.belongsTo(Usuarios);


module.exports =Locais;
