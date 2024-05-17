'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "localidade_local",
      [
        {
          quantidade: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quantidade: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Adicione mais objetos de localidade_local conforme necessário
      ],
      {}
    );
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("localidade_local", null, {});
  }
  
};
