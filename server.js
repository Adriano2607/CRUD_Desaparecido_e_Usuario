const express = require("express");
const cors = require('cors');




const server = express()
const dados = require("./src/data/dados.json")
const fs = require("fs")



server.use(cors())

server.use(express.json())

server.listen(3000,() =>{
    console.log("WORKS")
})


server.get('/desaparecidos', (req, res) => {
        return res.json(dados.pessoas);
});

server.post('/desaparecidos', (req, res) => {
    const novoDesaparecido = req.body;

    if (!novoDesaparecido.nome_completo || !novoDesaparecido.idade || !novoDesaparecido.genero || !novoDesaparecido.olhos || !novoDesaparecido.altura || !novoDesaparecido.peso || !novoDesaparecido.cabelo || !novoDesaparecido.residente_em || !novoDesaparecido.foto || !novoDesaparecido.ultima_vez_visto || !novoDesaparecido.vestimentas || !novoDesaparecido.data_desaparecimento || !novoDesaparecido.caracteristicas_fisicas || !novoDesaparecido.contato || !novoDesaparecido.detalhes_desaparecimento) {
        return res.status(400).json({ mensagem: "Dados incompletos" });
    } else {
        const totalIds = dados.pessoas.length;
        novoDesaparecido.id = totalIds + 1; 
        dados.pessoas.push(novoDesaparecido);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Sucesso" });
    }
});

server.delete("/desaparecidos/:id",(req,res) => {

    const playerId = parseInt(req.params.id)
    dados.pessoas = dados.pessoas.filter(u => u.id !== playerId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})
})

server.put('/desaparecidos/:id',(req,res) =>{
    
    const playerId = parseInt(req.params.id)

  

    const atualizarPlayer = req.body

    const idPlayer = dados.pessoas.findIndex(u => u.id === playerId)

    if(idPlayer === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
      
        dados.pessoas[idPlayer].nome_completo = atualizarPlayer.nome_completo || dados.pessoas[idPlayer].nome_completo
        dados.pessoas[idPlayer].idade = atualizarPlayer.idade || dados.pessoas[idPlayer].idade
        dados.pessoas[idPlayer].genero = atualizarPlayer.genero || dados.pessoas[idPlayer].genero
        dados.pessoas[idPlayer].olhos = atualizarPlayer.olhos || dados.pessoas[idPlayer].olhos
        dados.pessoas[idPlayer].altura = atualizarPlayer.altura || dados.pessoas[idPlayer].altura
        dados.pessoas[idPlayer].peso = atualizarPlayer.peso || dados.pessoas[idPlayer].peso
        dados.pessoas[idPlayer].cabelo = atualizarPlayer.cabelo || dados.pessoas[idPlayer].cabelo
        dados.pessoas[idPlayer].residente_em = atualizarPlayer.residente_em || dados.pessoas[idPlayer].residente_em
        dados.pessoas[idPlayer].foto = atualizarPlayer.foto || dados.pessoas[idPlayer].foto
        dados.pessoas[idPlayer].ultima_vez_visto = atualizarPlayer.ultima_vez_visto || dados.pessoas[idPlayer].ultima_vez_visto
        dados.pessoas[idPlayer].vestimentas = atualizarPlayer.vestimentas || dados.pessoas[idPlayer].vestimentas
        dados.pessoas[idPlayer].data_desaparecimento = atualizarPlayer.data_desaparecimento || dados.pessoas[idPlayer].data_desaparecimento
        dados.pessoas[idPlayer].caracteristicas_fisicas = atualizarPlayer.caracteristicas_fisicas || dados.pessoas[idPlayer].caracteristicas_fisicas
        dados.pessoas[idPlayer].contato = atualizarPlayer.contato || dados.pessoas[idPlayer].contato
        dados.pessoas[idPlayer].detalhes_desaparecimento = atualizarPlayer.detalhes_desaparecimento || dados.pessoas[idPlayer].detalhes_desaparecimento


        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})



server.get('/usuarios', (req, res) => {
    return res.json(dados.usuarios);
});

server.post('/usuarios', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.nome || !novoUsuario.cpf || !novoUsuario.username || !novoUsuario.senha){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        const totalIds = dados.usuarios.length;
        novoUsuario.id = totalIds + 1; 
        dados.usuarios.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

server.delete("/usuarios/:id",(req,res) => {

    const playerId = parseInt(req.params.id)
    dados.usuarios = dados.usuarios.filter(u => u.id !== playerId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})
})

server.put('/usuarios/:id',(req,res) =>{
    
    const playerId = parseInt(req.params.id)

    const atualizarPlayer = req.body

    const idPlayer = dados.usuarios.findIndex(u => u.id === playerId)

    if(idPlayer === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
      
        dados.usuarios[idPlayer].nome = atualizarPlayer.nome || dados.usuarios[idPlayer].nome
        dados.usuarios[idPlayer].cpf = atualizarPlayer.cpf || dados.usuarios[idPlayer].cpf
        dados.usuarios[idPlayer].username = atualizarPlayer.username || dados.usuarios[idPlayer].username
        dados.usuarios[idPlayer].senha = atualizarPlayer.senha || dados.usuarios[idPlayer].senha


        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})






function salvarDados(){
fs.writeFileSync(__dirname + "/src/data/dados.json",JSON.stringify(dados,null,2))
}