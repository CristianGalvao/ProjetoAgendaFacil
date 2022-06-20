//Importando o Express
const express = require('express');

//Importando o Model da Cadastro para manipularmos
const cadastroUsuario = require("../Model/usuario");
const Database = require('../Database/database')

//Configurações das rotas
const router = express.Router();

//Definindo as Rotas
router.post('/usuario/cadastroUsuario', (req, res) => {

        //  let{nome_categoria} = req.body;
        let {nome_usuario} = req.body;
        let {rg} = req.body;
        let {cpf} = req.body;
        let {endereco} = req.body;
        let {numero} = req.body;
        let {complemento} = req.body;
        let {telefone} = req.body;
        let {data_nascimento} = req.body;
        let {email} = req.body;
        let {senha} = req.body;
        let {fotoPerfil} = req.body;

        cadastroUsuario.create(
            {nome_usuario, rg, cpf, endereco, numero, complemento, telefone, data_nascimento, email, senha, fotoPerfil}
        ).then(
            (response) => {
              
                res.send(JSON.stringify('cadastrado'))
                console.log(response)
               
            }
        ).catch(function() {
        
            res.send(JSON.stringify('erro'));
        })
    });


    router.put('/cadastrarImagemPerfil', (req,res)=>{

        let {caminhoImagem} = req.body;
        let {idUsuario} = req.body;

        const sql = `update usuarios set fotoPerfil = '${caminhoImagem}' where idUsuario = ${idUsuario};`
        Database.query(sql)
        .then(
            (caminhoPerfil)=>{
                res.send(caminhoPerfil)
            }
        ).catch(function(){
            console.log("ERRO")
        })
        
    });

    router.put('/atualizarDadosPerfil/:idUsuario', (req, res)=>{

        let {nome_usuario} = req.body;
        let {endereco} = req.body;
        let {complemento} = req.body;
        let {telefone} = req.body;
        let {idUsuario} = req.params;
        let {numero} = req.body;

        const sql = `UPDATE usuarios SET nome_usuario = '${nome_usuario}', numero = ${numero}, endereco = '${endereco}', complemento = '${complemento}', telefone = '${telefone}' 
        WHERE idUsuario = ${idUsuario};`

        Database.query(sql)
        .then(
            (atualizarDadosUsuarios)=>{
                res.send(atualizarDadosUsuarios)
                console.log(atualizarDadosUsuarios)
            }
        ).catch(function(){
            res.send('erro')
            console.log('erro')
        })

    });

    router.get('/pegarImagemPerfil/:idUsuario', (req, res)=>{
        let {idUsuario} = req.params;

        const sql = `select fotoPerfil from usuarios where idUsuario = ${idUsuario};`
        Database.query(sql)
        .then(
            (caminhoImagem)=>{
                res.send(caminhoImagem[0])
                console.log(caminhoImagem[0])
            }
        ).catch(function(){
            console.log('erro')
        });
    });

    router.get('/pegarDadosUsuario/:idUsuario', (req, res)=>{

        let {idUsuario} = req.params;

        const sql = `SELECT * FROM usuarios WHERE idUsuario = ${idUsuario};`
        Database.query(sql)
        .then(
            (dadosUsuario)=>{
                res.send(dadosUsuario[0])
            }
        ).catch(function(){
            console.log("ERRO")
        })

    });

    module.exports = router;