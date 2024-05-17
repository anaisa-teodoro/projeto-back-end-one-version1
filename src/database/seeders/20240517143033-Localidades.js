'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "localidade",
      [
        {
          localidades: ["Localidade 1", "Localidade 2"],
          recomend: true,
          descricao: "Descrição da localidade 1 e 2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          localidades: ["Localidade 3", "Localidade 4", "Localidade 5"],
          recomend: false,
          descricao: "Descrição da localidade 3, 4 e 5",
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          localidades: ["Localidade 6", "Localidade 7", "Localidade 8"],
          recomend: false,
          descricao: "Descrição da localidade 6, 7 e 8",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  
  },

  async down (queryInterface, Sequelize) {
          await queryInterface.bulkDelete("localidade", null, {});
    }
  
};
