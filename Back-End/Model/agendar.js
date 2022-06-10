
const Sequelize = require("sequelize");
const connection = require('../Database/database');

const profissionais = require('./profissionais');
const unidade = require("./unidades");

const usuarioCadastro = require('./usuario');

const agendar = connection.define(

    'agendar',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        especialidade:{
            type: Sequelize.STRING(200),
            allowNull: false
        },

        preco:{
            type: Sequelize.DECIMAL(64,2),
            allowNull: false
        },

        horario:{
            type: Sequelize.STRING,
           
            allowNull: false
        },
        dia:{
            type: Sequelize.STRING,
            allowNull: false,
           
        },

        
        tipo:{
            type: Sequelize.STRING(100),
            allowNull: false
        },

        status:{
            type: Sequelize.STRING(100),
            allowNull: false
        },

        unidade:{
            type: Sequelize.STRING,
            allowNull: false
        },

        nomeProfissional:{
            type: Sequelize.STRING(100),
            allowNull: false
          
        },

        compareceu:{
            type: Sequelize.STRING(100),
            allowNull: false
          
        },

        idUsuario:{
            type: Sequelize.INTEGER,
        }

    },{ freezeTableName: true });



// Chaves Estrangeiras para profissionais



// agendar.sync({force: true})

module.exports = agendar;
 


