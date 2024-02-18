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


server.get('/teste', (req, res) => {
        return res.json(dados.teste);
});



function salvarDados(){
fs.writeFileSync(__dirname + "/data/dados.json",JSON.stringify(dados,null,2))
}