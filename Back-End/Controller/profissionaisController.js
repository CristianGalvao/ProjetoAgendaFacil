const express = require('express');

const router = express.Router();

const profissionais = require ('../Model/profissionais');

router.get('/listarProfissionais', (req, res)=> {
    profissionais.findAll()
    .then(
        (profissionais)=> {
            res.send(profissionais);
        }
    )
});

module.exports = router;