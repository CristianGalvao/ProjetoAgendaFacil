const Sequelize = require("sequelize");
const connection = require('../Database/database');
const agendar = require('./agendar');

const unidades = connection.define(

    'unidades',
    {
        idUnidades:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

       endereco:{
            type: Sequelize.STRING,
            allowNull: false
        },

        telefone:{
            type: Sequelize.STRING(20),
            allowNull: false
        },

    }

);


// unidades.sync({force: true});

// Chave estrangeira com agendar



module.exports = unidades;