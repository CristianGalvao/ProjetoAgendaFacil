const express = require('express');
const router = express.Router();
const agenda = require("../Model/agendar");

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
})

module.exports = router;