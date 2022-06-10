//Importando o sequelize para manipularmos o banco
const Sequelize = require('sequelize');
const agendar = require('../Model/agendar');

//Importando o bando de dados
const connection = require('../Database/database');

const usuarioCadastro = connection.define(

        'usuario',
            {

                idUsuario: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },

                nome_usuario:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                rg:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                cpf:{
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                endereco:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                numero:{
                    type: Sequelize.INTEGER,
                    allowNull: false
                },

                complemento:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                telefone:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                data_nascimento:{
                    type: Sequelize.STRING,
                    allowNull: false
                },


                email:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                senha:{
                    type: Sequelize.STRING,
                    allowNull: false
                },

                fotoPerfil: {
                    type: Sequelize.STRING,
                    allowNull: true
                }

            }

);

//Forçando para criar a tabela | Comentar depois de criado
 //usuarioCadastro.sync({force: true}); 

// Chave estrangeira com agendar
// usuarioCadastro.hasMany(agendar);
// agendar.belongsTo(usuarioCadastro);

module.exports = usuarioCadastro;