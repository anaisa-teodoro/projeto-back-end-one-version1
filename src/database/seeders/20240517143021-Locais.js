'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "locais",
      [
        {
          usuario_id: 1,
          nome_local: "Local 1",
          email: "local1@dominio.com",
          cep: "12345-678",
          logradouro: "Rua Exemplo, 123",
          numero: "123",
          bairro: "Bairro Exemplo",
          cidade: "Cidade Exemplo",
          estado: "Estado Exemplo",
          complemento: "Complemento Exemplo",
          lat: "-27.6019",
          lon: "-48.4703",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          usuario_id: 2,
          nome_local: "Local 2",
          email: "local2@dominio.com",
          cep: "54321-876",
          logradouro: "Avenida Exemplo, 456",
          numero: "456",
          bairro: "Outro Bairro",
          cidade: "Outra Cidade",
          estado: "Outro Estado",
          complemento: "Outro Complemento",
          lat: "-27.6020",
          lon: "-48.4704",
          status: "ativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        usuario_id: 3,
        nome_local: "Local 3",
        email: "local2@dominio.com",
        cep: "54321-873",
        logradouro: "Avenida Exemplo, 457",
        numero: "457",
        bairro: "Outro Bairro III",
        cidade: "Outra Cidade III",
        estado: "Outro Estado III",
        complemento: "Outro Complemento",
        lat: "-27.6045",
        lon: "-48.4745",
        status: "ativo",
        created_at: new Date(),
        updated_at: new Date(),
        },

      ],
      {}
    
    );
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
