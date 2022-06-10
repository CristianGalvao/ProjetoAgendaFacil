const express = require("express");

const router = express.Router();

const agendar = require('../Model/agendar');
const teste = require('../Model/Testes/testeAgendar')

router.post('/teste', async (req, res)=>{


    let response = await agendar.findOne({
        where:{idUsuario: req.body.idUsuario }
    });


    res.send(response)

});


router.post('/teste/agendar', async (req, res)=>{

        let {nome} = req.body;
        let {sobrenome} = req.body;
        let {idUsuario} = req.body;
        let {statuss} = req.body;

       let response = await teste.create(
            {idUsuario, nome, sobrenome, statuss}
        );
        res.send(response)
        console.log(response)

});

//Rota de listagem por ID de categoria (Verbo HTTP: Get)
router.get('/teste/consultas/:id',
    (req, res) => {

        let {id} = req.params;
        // console.log("ID: " + id);

        teste.findByPk(id).then(
            (teste)=>{
                res.send(teste)
                console.log(teste)
            }
        );

    }
);

router.get('/novoTeste/:idUsuario', async (req,res)=>{
    
    let {idUsuario} = req.params;

    const response = await teste.findAll(
        {
            where: {
                idUsuario: idUsuario
            }
        }
    );
    res.send(response)

});

router.put('/teste/atualizar/:idUsuario/:id', (req, res)=>{

        let {idUsuario} = req.params;
        let {id} = req.params;
        let {statuss} = req.body;

        teste.update(
            {statuss: "Agendado"},
            {where: {idUsuario, id}}
        ).then(
            (teste)=>{
                console.log("ATUALIZADO")
                res.send(teste)
            }
        )
});

router.get("/teste/pegarStatus/:idUsuario/:id", async (req, res)=>{

    let {idUsuario} = req.params;
    let {id} = req.params;

    const response = await teste.findAll(
        {
            where: {
                idUsuario: idUsuario,
                id: id
            }
        }
    );
    res.send(response);
})



module.exports = router  