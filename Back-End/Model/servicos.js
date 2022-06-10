const sequelize = require("sequelize");
const connection = require('../Database/database');
const agendar = require('../Model/agendar');

const servicos = connection.define(

    'servicos',
    {
        idServicos:{
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        descricao:{
            type: sequelize.STRING(250),
            allowNull: false
        },

        tipo:{
            type: sequelize.STRING(100),
            allowNull: false
        },

        preco:{
            type: sequelize.DECIMAL(64,2),
            allowNull: false
        }
        
    }

);

// servicos.sync({force: true});

// Chave estrangeira com agendar
 //agendar.hasMany(servicos);
 //servicos.belongsTo(agendar);

module.exports = servicos;