const sequelize = require('sequelize');
const Database = require('../Database/database');

const especialidade = Database.define(

    'especialidade',
    {
        idEspecialidade:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nomeEspecialidade:{
            type: sequelize.STRING
        },

        tipo:{
            type: sequelize.STRING
        }
    }

);

// especialidade.sync({force: true});


module.exports = especialidade;