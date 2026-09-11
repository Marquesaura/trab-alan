const gerarBtn = document.getElementById('gerar-btn');
const logo = document.querySelector('.logo')
logo.style.display = "none";


gerarBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const userGit = document.getElementById('username').value;



    if (nome == "" || email == "" || userGit == "") {
        alert("Complete the required fields!");


    } else {
        gerarBtn.style.display = "none";
        logo.style.display = "flex";

        const titulo = document.querySelector('h1');
        const subtitulo = document.querySelector('h2');
        const ticketImagem = document.createElement('img');
        const form = document.querySelector('form');


        titulo.textContent = `Congrats, ${nome}! Your ticket is ready!`;
        subtitulo.textContent = `We've emailed your ticket to ${email} and will send updates in the run up to the event.`;
        ticketImagem.setAttribute('src', 'assets/images/pattern-ticket.svg');
        form.classList.add('ticket');

        const dadosEvent = document.createElement('p');
        dadosEvent.textContent = "Jan 31, 2025 / Austin, TX";
        form.append(dadosEvent)

        const novoNome = document.createElement('p');
        novoNome.textContent = nome;
        novoNome.classList.add('nome-alterado')
        form.append(novoNome)



    }
})