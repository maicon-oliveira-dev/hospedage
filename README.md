# Monterey Landing Page

Landing page conceito para **Monterey Pet & Resort**, criada em HTML5, CSS3 e JavaScript Vanilla, sem dependências e pronta para abrir direto no navegador.

## Como abrir

1. Abra a pasta `monterey-landing-page/` no VS Code.
2. Dê duplo clique em `index.html` ou use uma extensão como Live Server.
3. A página funciona localmente, inclusive com fallbacks visuais quando as imagens ainda não foram adicionadas.

## Estrutura do projeto

```text
monterey-landing-page/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
```

## Onde trocar o número do WhatsApp

Edite a constante `WHATSAPP_NUMBER` em:

- `assets/js/script.js`

Trecho:

```js
// Substitua pelo número oficial do Monterey antes de publicar.
const WHATSAPP_NUMBER = "5547999999999";
```

Todos os botões com CTA de WhatsApp e o formulário usam essa constante.

## Onde colocar as imagens reais

Adicione as imagens dentro de:

- `assets/img/`

Nomes esperados pelo layout:

- `logo-monterey.png`
- `hero-resort.jpg`
- `fachada.jpg`
- `hospedagem-caes.jpg`
- `hospedagem-gatos.jpg`
- `escolinha.jpg`
- `banho-tosa.jpg`
- `taxi-pet.jpg`
- `saude-preventiva.jpg`
- `galeria-01.jpg`
- `galeria-02.jpg`
- `galeria-03.jpg`
- `galeria-04.jpg`
- `galeria-05.jpg`
- `galeria-06.jpg`

Se algum arquivo não existir, o layout não quebra. A página mostra um fallback premium com degradês e instruções de substituição.

## Imagens recomendadas

Para manter a proposta visual da landing page, prefira:

- `logo-monterey.png`: logo oficial da marca com boa resolução e fundo transparente.
- `hero-resort.jpg`: fachada, recepção, fachada iluminada ou imagem forte do ambiente.
- `fachada.jpg`: visão externa ou interna que transmita estrutura e confiança.
- `hospedagem-caes.jpg`: cães hospedados, descansando ou em rotina assistida.
- `hospedagem-gatos.jpg`: gatos em ambiente tranquilo e confortável.
- `escolinha.jpg`: pets em atividades, socialização ou rotina da escolinha.
- `banho-tosa.jpg`: banho, tosa, escovação ou finalização estética.
- `taxi-pet.jpg`: veículo, transporte ou momento de embarque/chegada.
- `saude-preventiva.jpg`: rotina de cuidado, observação ou bem-estar.
- `galeria-01` a `galeria-06`: mistura de estrutura, atividades, hospedagem, estética e pets felizes.

## Como alterar textos principais

Os textos da página estão centralizados em:

- `index.html`

Pontos mais importantes para ajuste:

- Headline principal no hero
- Descrições de serviços
- Perguntas frequentes
- Informações do rodapé
- Mensagens automáticas dos botões com `data-message`

## Personalização visual

As cores, espaçamentos e estilos globais estão em:

- `assets/css/style.css`

Itens principais:

- Variáveis de cor em `:root`
- Tipografia
- Botões
- Cards
- Breakpoints de responsividade

## Observações antes de publicar

- Endereço, telefone, horários, disponibilidade e regras de hospedagem precisam ser confirmados com o cliente.
- As respostas do FAQ foram escritas de forma segura para não inventar políticas internas.
- As metas de Open Graph usam imagem local como placeholder. Em produção, o ideal é atualizar para uma URL pública real.
- Caso o cliente aprove o projeto, vale revisar SEO local com dados confirmados da empresa e eventualmente incluir mapa, schema markup e prova social validada.
