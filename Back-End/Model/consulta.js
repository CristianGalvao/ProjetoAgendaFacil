const Sequelize = require('sequelize');

//Importando o bando de dados
const connection = require('../Database/database');

const consulta = connection.define(
 
        'consultas',

        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            preco:{
                type: Sequelize.DECIMAL,
                allowNull: false
            },

            especialidade:{
                type: Sequelize.STRING,
                allowNull: false
            },
        }

);

// consulta.sync({force: true});
module.exports = consulta; 