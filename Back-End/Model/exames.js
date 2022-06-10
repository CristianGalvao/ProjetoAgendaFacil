const sequelize = require('sequelize');
const Database = require('../Database/database');

const exames = Database.define(

    'exames',
    {
        idExames:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        nomeExame:{
            type: sequelize.STRING
        }
    }

);

// exames.sync({force: true});

module.exports = exames;