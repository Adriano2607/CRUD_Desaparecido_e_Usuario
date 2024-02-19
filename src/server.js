const express = require("express");
const cors = require('cors');




const server = express()
const dados = require("./data/dados.json")
const fs = require("fs")



server.use(cors())

server.use(express.json())

server.listen(3000,() =>{
    console.log("WORKS")
})


server.get('/desaparecidos', (req, res) => {
        return res.json(dados.pessoas);
});


server.get('/usuarios', (req, res) => {
    return res.json(dados.usuarios);
});


server.post('/usuarios', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.nome || !novoUsuario.cpf || !novoUsuario.username || !novoUsuario.senha){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.usuarios.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

server.post('/desaparecidos', (req,res) => {
    const novoDesaparecido = req.body

    if( !novoDesaparecido.nome_completo || !novoDesaparecido.idade || !novoDesaparecido.genero || !novoDesaparecido.olhos|| !novoDesaparecido.altura|| !novoDesaparecido.peso|| !novoDesaparecido.cabelo|| !novoDesaparecido.residente_em|| !novoDesaparecido.foto|| !novoDesaparecido.ultima_vez_visto|| !novoDesaparecido.vestimentas || !novoDesaparecido.data_desaparecimento|| !novoDesaparecido.caracteristicas_fisicas|| !novoDesaparecido.contato|| !novoDesaparecido.detalhes_desaparecimento){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.pessoas.push(novoDesaparecido)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})


function salvarDados(){
fs.writeFileSync(__dirname + "/data/dados.json",JSON.stringify(dados,null,2))
}