const express = require('express');
const database = require('../Database/database');
const router = express.Router();

const profissionais = require ('../Model/profissionais');

router.get('/listarProfissionais', (req, res)=> {
const sql = `SELECT nomeProfissional, crm, especialidade FROM profissionais;`

database.query(sql).then(
    (nomeProfissional)=> {
        res.send(nomeProfissional[0])
    }
)
});

module.exports = router;