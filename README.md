# Chamada Senac

Sistema simples de registro de presença em sala de aula, usando **Firebase Firestore**. Front-end 100% estático, pronto para hospedar no GitHub Pages.

## Estrutura

```
/
├── index.html                 # Tela inicial (escolha Aluno / Professor)
├── style.css                  # Estilos globais
├── js/
│   ├── firebase-config.js     # Configuração e helpers do Firebase
│   └── modal.js               # Modais (substitui alert/confirm nativos)
└── pages/
    ├── login-aluno.html
    ├── cadastro-aluno.html
    ├── aluno.html             # Painel do aluno (marcar presença)
    ├── login-professor.html
    └── professor.html         # Painel do professor
```

## Acesso do Professor
- **Usuário:** `Seu_Usuário`
- **Senha:** `Sua_Senha`

## Fluxo

### Aluno
1. Cadastra-se em `pages/cadastro-aluno.html` (fica com status **pendente**).
2. Aguarda um professor aprovar.
3. Após aprovado, faz login e pode **marcar presença** (uma vez por dia).
4. Não pode editar nem apagar presenças.

### Professor
1. Faz login com as credenciais acima.
2. Aba **Aprovações**: aprova/rejeita cadastros pendentes.
3. Aba **Alunos**: gerencia alunos aprovados e vincula cada aluno a uma sala.
4. Aba **Salas**: cria/remove salas.
5. Aba **Presenças**: visualiza todos os registros com filtro por sala e data.

## Coleções no Firestore
- `alunos` — `{ nome, email, senha(hash), status: 'pendente'|'aprovado'|'rejeitado', salaId, salaNome, createdAt }`
- `salas` — `{ nome, createdAt }`
- `presencas` — `{ alunoId, alunoNome, salaId, salaNome, data(YYYY-MM-DD), timestamp }`

## Regras recomendadas do Firestore
Para uso didático, você pode liberar leitura/escrita, mas o ideal é criar regras.
Exemplo bem simples para começar (⚠️ público — apenas dev/testes):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Rodar localmente
Basta abrir `index.html` em um navegador. Como usa ES Modules, recomenda-se
servir via um servidor estático simples:

```
npx serve .
```

## Deploy no GitHub Pages
1. Suba a pasta como repositório no GitHub.
2. Em **Settings → Pages**, aponte para a branch `main` e pasta `/root`.
3. O `index.html` estará disponível na URL do Pages.

## Observações
- Nenhum `alert()` / `confirm()` nativo é usado — todas as mensagens são exibidas em modais.
- Senhas de alunos são armazenadas com hash SHA-256 (via `crypto.subtle`).
- O login do professor é validado no front-end (conforme solicitado); para produção use regras/Custom Claims no Firebase.
