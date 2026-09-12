const gerarBtn = document.getElementById('gerar-btn');
const logo = document.querySelector('.logo')
logo.style.display = 'none';


gerarBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const userGit = document.getElementById('username').value;



    if (!nome || !email || !userGit) {
        alert("Complete the required fields!");

    } else {
        gerarBtn.style.display = 'none';
        logo.style.display = 'flex';


        const titulo = document.querySelector('h1');
        const subtitulo = document.querySelector('h2');
        const ticketImagem = document.createElement('img');
        ticketImagem.setAttribute('src', 'assets/images/pattern-ticket.svg');
        const form = document.querySelector('form');

        const span = document.querySelector('span');

        subtitulo.style.display = 'none';

        titulo.style.display = 'none';

        const parabens = document.createElement('h1');
        parabens.textContent = 'Congrats,';
        parabens.classList.add('mensagem-inicial');
        span.append(parabens);
        parabens.classList.add = ('parabens')

        const novoNome = document.createElement('h1');
        novoNome.textContent = `${nome}!`;
        novoNome.classList.add('nome-alterado');
        span.append(novoNome);

        const resto = document.createElement('h1');
        resto.textContent = 'Your ticket is ready!';
        resto.classList.add('mensagem-inicial');
        span.append(resto);

        const mensagem = document.createElement('p');
        mensagem.textContent = "We've emailed your ticket to";
        mensagem.classList.add('mensagem-ticket');
        span.append(mensagem);

        const novoEmail = document.createElement('p');
        novoEmail.textContent = email;
        novoEmail.classList.add('nome-alterado');
        span.append(novoEmail);

        const restoMensagem = document.createElement('p');
        restoMensagem.textContent = "and will send updates in the run up to the event.";
        restoMensagem.classList.add('mensagem-ticket');
        span.append(restoMensagem);

        form.classList.add('ticket');
        span.classList.add('novo-estilo')

        const dadosEvent = document.createElement('p');
        dadosEvent.textContent = 'Jan 31, 2025 / Austin, TX';
        form.append(dadosEvent);



    }
});