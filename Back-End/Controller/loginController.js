const express = require("express");

const router = express.Router();

const cadastro = require('../Model/usuario');

router.post('/usuario/login', async (req, res)=>{

    let response=await cadastro.findOne({
        where:{senha: req.body.senha, email: req.body.email }
    });
    if(response === null){
        res.send(JSON.stringify('error'));
      
    }else{
        res.send(response);
    }

    });

module.exports = router; 