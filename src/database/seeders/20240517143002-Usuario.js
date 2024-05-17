'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuario",
      [
        {
          nome_completo : 'Eterna Java',
          sexo: 'Feminino',
          cpf : '122454945454',
          email : 'devz@dev.com',
          senha : 'DevFuturo@25',
          endereco : 'Rua porta 3333',    
          status: 'ativo', 
          data_nascimento: '2023-15-20',
          created_at: new Date(),
          updated_at: new Date(),

        },
        {
          nome_completo: "Nome1 Sobrenome1",
          endereco: 'Rua porta 3353',
          sexo: "Masculino",
          cpf: "11111111111",
          email: "usuario1@dominio.com",
          senha: "DevFuturo@26",
          data_nascimento: "2000-01-01",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome_completo: "Nome2 Sobrenome2",
          endereco: 'Rua porta 3343',
          sexo: "Feminino",
          cpf: "22222222222",
          email: "usuario2@dominio.com",
          senha: "Futuro@26",
          data_nascimento: "1995-02-15",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
         await queryInterface.bulkDelete("usuario", null, {});
    }
  };
  

