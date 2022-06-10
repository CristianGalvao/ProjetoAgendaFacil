const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp')

router.post('/enviarEmailFaleConosco',(req,res)=>{

   let {email} = req.body;
   let {assunto} = req.body;
   let {mensagem} = req.body;


   
   const transporter = nodemailer.createTransport({
       host:SMTP_CONFIG.host,
       port:SMTP_CONFIG.port,
       secure:false,
       auth:{
           user:SMTP_CONFIG.user,
           pass:SMTP_CONFIG.pass,
       },
       tls:{
       rejectUnauthorized:false,
       },
   });
   
   async function run(){
       const mailSent = await transporter.sendMail({
           text:mensagem,
           subject:assunto,
           from:'Usuario <testeprotccDes@gmail.com>',
           to:email
       });

       res.send(JSON.stringify("enviado"))
       
       console.log(mailSent)
   }
     
   run();

return


})

module.exports = router