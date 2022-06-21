const express = require('express');
const router = express.Router();
const agenda = require("../Model/agendar");
const Database = require('../Database/database');

router.get('/carrinho/aguardandoPagamento/:idUsuario', (req, res)=>{

    let {idUsuario} = req.params;

    agenda.findAll({
        where:{
            idUsuario,
            status: "Aguardando Pagamento"
        }
    }).then(
        (carrinho)=>{
            res.send(carrinho)
        }
    ).catch(function(){
        res.send("Erro")
    })
});

router.get('/somarPrecoPendencia/:idUsuario', (req, res)=>{

    let {idUsuario} = req.params;

    const sql = `SELECT SUM(preco) AS total FROM agendar WHERE idUsuario = ${idUsuario} and status = "Aguardando pagamento";`

    Database.query(sql)
    .then(
        (dadosPendentes)=>{
            res.send(dadosPendentes[0])
        }
    ).catch(function(){
        console.log('erro')
    });
});

router.delete('/deletarAguardandoPagamento', (req, res)=>{

    let {idUsuario} = req.body;
    let {id} = req.body;

    const sql = `DELETE FROM agendar WHERE id = ${id} and status = "Aguardando pagamento" and idUsuario = ${idUsuario};`

    Database.query(sql)
    .then(
        ()=>{
            res.send('DADOS EXCLUÍDOS')
        }
    )

});

module.exports = router;