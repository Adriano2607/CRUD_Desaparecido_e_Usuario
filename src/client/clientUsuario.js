 function addUsuario() {
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const username = document.getElementById('username').value
    const senha = document.getElementById('senha').value
    
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            cpf,
            username,
           senha
        }),
    })
    .then(response => response.json())
    .then(data => {
      alert('SUCESSO')
    })
    .catch(error => alert("Erro:", error))
}