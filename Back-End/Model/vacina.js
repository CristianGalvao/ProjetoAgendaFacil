const sequelize = require('sequelize');
const Database = require('../Database/database');

const vacina = Database.define(

    'vacina',
    {
        idVacina:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        nomeVacina:{
            type: sequelize.STRING
        }
    }

);

// vacina.sync({force: true});

module.exports = vacina;