const gerarBtn = document.getElementById('gerar-btn');

gerarBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const userGit = document.getElementById('username').value;


    if (nome == "" || email == "" || userGit == "") {
        alert("Complete the required fields!");
    } else {
        const titulo = document.querySelector('h1');
        titulo.textContent = `Congrats, ${nome}! Your ticket is ready!`;

    }
})
