const Sequelize = require('sequelize');
const connection = require('../../Database/database');

const tbl_teste = connection.define(

    'tbl_teste',
    {
        dia:{
            type: Sequelize.INTEGER
        },
    }

);

// tbl_teste.sync({force: true});

module.exports = tbl_teste;