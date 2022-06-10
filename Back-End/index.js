//Importando o Framwork Express
const express = require('express');
var Sequelize = require('sequelize');

//importando as dependencias
const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('./config/smtp')

//Instanciando o express
const app = express();

//Importando o model de Cadastro
const cadastro = require("./Model/usuario");
const agendar = require('./Model/agendar');
const unidades = require('./Model/unidades');
const servicos = require('./Model/servicos');
const especialidade = require("./Model/especialidade");
const vacina = require('./Model/vacina');
const exames = require('./Model/exames');

app.use(function (req, res, next) {
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Content-Type", "text/plain; charset=UTF-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST, GET");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Max-Age","86400");
    next();
  });

//Importando o bando de dados
const connection = require("./Database/database");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Importando o Controller
const cadastroUsuario = require("./Controller/cadastroController");
app.use('/', cadastroUsuario);

//Importando Teste
const testeHorarioController = require('./Controller/testeHorarioController');
app.use('/', testeHorarioController);

const consulta = require('./Controller/consultaController');
app.use("/", consulta);

const login = require('./Controller/loginController');
app.use('/', login);

const teste = require('./Controller/testeLoginConsulta');
app.use('/', teste);

const agendarController = require("./Controller/agendarController");
app.use('/', agendarController);

const carrinhoController = require('./Controller/carrinhoController');
app.use("/", carrinhoController);

const faleConoscoController = require('../Back-End/Controller/faleConoscoController');
app.use('/', faleConoscoController);

const profissionaisController = require('../Back-End/Controller/profissionaisController');
app.use('/', profissionaisController)

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000 na URL: http://localhost:3000');
});

