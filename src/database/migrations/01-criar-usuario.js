"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("usuario", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },        
            nome_completo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            sexo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true,
            },           
            endereco: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
                senha: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
             data_aniversario: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
            type_user: {
                type: Sequelize.ENUM("Admin", "User"),
                allowNull: false,
                defaultValue: "Usuario",
            },   
            status: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: "ativo",
              },        
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("usuario");
    },
}
