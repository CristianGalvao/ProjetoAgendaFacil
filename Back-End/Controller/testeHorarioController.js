const express = require("express");
const router = express.Router();
const database = require('../Database/database')
const teste = require('../Model/Testes/testeAgendar');
const diaAgendamento  = require('../Model/agendar');
const agendar = require("../Model/agendar");

router.post('/testeHorario', async (req, res)=>{
   
    let {dia} = req.body;

   const sql = `INSERT INTO tbl_testes (dia, createdAt, updatedAt) VALUES (${dia}, now(), now());`;

    let respostas = await database.query(sql);

    if(respostas){
        res.send("Foi")
    }else{
        res.send("Nçao")
    }

});

router.get('/testeHorarioDia', (req, res)=>{

    let {dia}  = req.body;



    const sql = `select horarios from horarios where horarios not in(select horario from agendar where dia = '17/05/2022');`
     database.query(sql).then(
         (dia)=>{
             res.send(dia)
             console.log(dia)
         }
     )

})


router.get('/trazerTudo', (req, res)=>{
    agendar.findAll().then(
        (resposta)=>{
            res.send(resposta)
        }
    )
})



module.exports = router;