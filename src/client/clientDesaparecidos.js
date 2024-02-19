function addDesaparecidos() {

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const genero = document.getElementById("genero").value;
    const olhos = document.getElementById("olhos").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    const cabelo = document.getElementById("cabelo").value;
     const residenteEm = document.getElementById("residente").value;
    
   
    const foto = document.getElementById("foto").value;
    const ultimaVezVisto = document.getElementById("ultima").value;
     const vestimentas = document.getElementById("vestimentas").value;
    const dataDesaparecimento = document.getElementById("data").value;
    const caracteristicasFisicas = document.getElementById("caracte").value;
    const contato = document.getElementById("contato").value;
    const detalhesDesaparecimento = document.getElementById("detalhes-desaparecimento").value;
    
    fetch('http://localhost:3000/desaparecidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_completo: nome,
            idade: idade,
            genero: genero,
            olhos: olhos,
            altura: altura,
            peso: peso,
            cabelo: cabelo,
            residente_em: residenteEm,
            foto: foto,
            ultima_vez_visto: ultimaVezVisto,
            vestimentas: vestimentas,
            data_desaparecimento: dataDesaparecimento,
            caracteristicas_fisicas: caracteristicasFisicas,
            contato: contato,
            detalhes_desaparecimento: detalhesDesaparecimento
        })
    })
    .then(response => response.json())
    .then(() => {
      alert('SUCESSO')
    })
    .catch(error => console.log("Erro:" + error))
}