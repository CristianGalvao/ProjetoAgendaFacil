const express = require('express');
const router = express.Router();
const agendar = require('../Model/agendar');
const Database = require('../Database/database');
const especialidade = require('../Model/especialidade');

router.post('/agendar/consulta', (req, res) => {

    let { especialidade } = req.body;
    let { unidade } = req.body;
    let { preco } = req.body;
    let { horario } = req.body;
    let { dia } = req.body;
    let { tipo } = req.body;
    let { status } = req.body;
    let { nomeProfissional } = req.body;
    let { idUsuario } = req.body;
    let {compareceu} = req.body;

    agendar.create(
        { especialidade, unidade, preco, horario, dia, tipo, status, nomeProfissional, idUsuario, compareceu }
    ).then(
        (response) => {
            res.send(response);
        }
    ).catch(function (response) {
        console.log(response);
        res.send(JSON.stringify('Servidor'));
    })

    // const sql = `INSERT INTO Agendamentos 


    //         (idProfissionais,idUnidades,Especialidade,Preco,Horario,Dia,Tipo, Status, idUsuario) 


    // VALUES (${idProfissionais}, ${idUnidades}, '${especialidade}', ${preco}, '${horario}', '${dia}', '${tipo}', '${status}',
    //  ${idUsuario});`

    //  Database.query(sql).then(
    //     (agendamento)=>{
    //         res.send(agendamento)
    //         console.log(agendamento)
    //     }
    // ).catch(function(response) {
    //         console.log(response);
    //         res.send(JSON.stringify('Servidor'));
    //     })


});

router.get("/agendar/dadosCarrinho/:idUsuario/:id", async (req, res) => {

    let { idUsuario } = req.params;
    let { id } = req.params;

    const response = await agendar.findAll(
        {
            where: {
                idUsuario: idUsuario,
                id: id
            }
        }
    );
    res.send(response);
});

router.get('/historico/agendado/:idUsuario', (req, res) => {

    let { idUsuario } = req.params;

    let resposta = agendar.findAll({
        where: {
            status: "Agendado",
            
            idUsuario: idUsuario
        }
    }).then(
        (agendar) => {
            res.send(agendar)
        }
    )

});

router.put('/agendar/atualizar/:idUsuario/:id', (req, res) => {

    let { idUsuario } = req.params;
    let { id } = req.params;


    agendar.update(
        { status: "Agendado" },
        { where: { idUsuario, id } }
    ).then(
        (response) => {
            console.log("ATUALIZADO")
            res.send(response)
        }
    ).catch(function () {
        console.log("Foi não meu patrão")
        res.send(JSON.stringify('erro'))
    });
});

router.post(`/buscarHorario`, (req, res) => {
    

    let { dia } = req.body;
    let { idProfissionais } = req.body

    const sql = `select distinct horarios from horarios where horarios not in(select distinct horario from agendar where nomeProfissional = '${idProfissionais}' and dia = '${dia}');`
    Database.query(sql).then(
        (horario)=>{
            res.send(horario[0]) 
            console.log(horario[0])
        }
    )
});

router.post(`/buscarHorario/vacinas`, (req, res) => {
    

    let { dia } = req.body;
    let { nomeProfissional } = req.body

    const sql = `select distinct horarios from horarios where horarios not in(select distinct horario from agendar where nomeProfissional = '${nomeProfissional}' and dia = '${dia}');`
    Database.query(sql).then(
        (horario)=>{
            res.send(horario[0]) 
            console.log(horario[0])
        }
    )
});

router.get('/listarProfissionaisEspecialidade/:nomeEspecialidade', (req, res)=>{

    let {nomeEspecialidade} = req.params;

    const sql = `select nomeProfissional from profissionais where especialidade = '${nomeEspecialidade}';`
    Database.query(sql)
    .then(
        (nomeProfissional)=>{
            res.send(nomeProfissional[0])
        }
    )

});

router.get('/listarEspecialidades', (req, res)=>{
  
    const sql = `select nomeEspecialidade from especialidades where tipo = 'Consulta';`;
    Database.query(sql)
    .then(
        (nomeEspecialidade)=>{
            res.send(nomeEspecialidade[0])
        }
    )

});

router.get('/listarEspecialidades/exames', (req, res)=>{
  
    const sql = `select nomeEspecialidade from especialidades where tipo = 'Exames';`;
    Database.query(sql)
    .then(
        (nomeEspecialidade)=>{
            res.send(nomeEspecialidade[0])
        }
    )

});

router.get('/listarEspecialidades/vacinas', (req, res)=>{
  
    const sql = `select nomeEspecialidade from especialidades where tipo = 'Vacinas';`;
    Database.query(sql)
    .then(
        (nomeEspecialidade)=>{
            res.send(nomeEspecialidade[0])
        }
    )

});

router.get('/listarUnidades', (req, res)=>{

    const sql = `select endereco from unidades;`;
    Database.query(sql)
    .then(
        (nomeUnidades)=>{
            res.send(nomeUnidades[0])
        }
    )

});

router.get('/listarExames', (req, res)=>{

    const sql = `select nomeExame from exames;`
    Database.query(sql)
    .then(
        (nomeExames)=>{
            res.send(nomeExames[0]);
        }
    )

});

router.put('/cancelarAgendamento/:id', (req, res)=>{

    let {id} = req.params

    const sql = `UPDATE agendar set status = "Cancelado" where id = ${id};`

    Database.query(sql)
    .then(
        (atualizarStatus)=>{
            res.send(atualizarStatus)
        }
        )

});


module.exports = router;