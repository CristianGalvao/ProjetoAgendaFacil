const sequelize = require("sequelize");
const connection = require('../Database/database');
const agendar = require('./agendar')

const profissionais = connection.define(

    'profissionais',
    {
        idProfissionais:{
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        nomeProfissional:{
            type: sequelize.STRING(100),
            allowNull: false
        },

        crm:{
            type: sequelize.STRING(20),
            allowNull: false
        },

        especialidade:{
            type: sequelize.STRING(100),
            allowNull: false
        },

        tipo:{
            type: sequelize.STRING(100),
            allowNull: false
        }
        
    });



 

 //profissionais.sync({force:true});

module.exports = profissionais;