# Gerador de ingressos — Coding Conf

## Visão geral

Aplicação web estática para preencher os dados de participação na Coding Conf e gerar um ingresso digital.

## Funcionalidades

- Formulário com nome completo, endereço de e-mail, usuário do GitHub e campo de seleção de imagem.
- Verificação dos campos obrigatórios antes da geração do ingresso.
- Exibição do nome, e-mail, usuário do GitHub, data e local do evento no ingresso.
- Geração de um código aleatório de cinco algarismos, precedido por `#` e exibido na lateral do cartão.
- Layout responsivo para dispositivos móveis, tablets e desktops.

> O campo de seleção de imagem está disponível no formulário. No ingresso, a foto exibida é carregada a partir do nome de usuário do GitHub informado.

## Tecnologias

- HTML
- CSS
- JavaScript

O projeto não exige instalação de dependências ou etapa de compilação.

## Como executar

Abra o arquivo `index.html` em um navegador. Para testar o layout responsivo, use as ferramentas de desenvolvimento do navegador e redimensione a janela; o guia de estilo define 375px para mobile e 1440px para desktop, e o layout também deve funcionar a partir de 320px.

## Referências de estilo

As cores, a tipografia e os tamanhos de referência estão documentados em `style-guide.md`. As imagens de referência visual estão na pasta `design/`.
