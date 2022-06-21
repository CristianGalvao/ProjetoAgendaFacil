const express = require('express');
const database = require('../Database/database');
const router = express.Router();

const unidade = require('../Model/unidades');

const profissionais = require ('../Model/profissionais');

router.get('/listarProfissionais', (req, res)=> {
const sql = `SELECT nomeProfissional, crm, especialidade FROM profissionais;`

database.query(sql).then(
    (nomeProfissional)=> {
        res.send(nomeProfissional[0])
    }
)
});



    router.get('/listarUnidades', (req, res)=> {
    const sql = `SELECT endereco, telefone FROM unidades;`
    
    database.query(sql).then(
        (nomeUnidades)=> {
            res.send(nomeUnidades)
            console.log(nomeUnidades)
        }
    ).catch(function(){
        console.log('erro')
    })
    });

module.exports = router;