# Módulo I - Projeto Back-end - API Rest Natureza365

### Configurações:

### Pré-configurações

- Git e github;
- IDE de sua preferência;
- Javascript com foco Back-end em NodeJS
- PostgreSQL;
- Gerenciador de banco de dados de sua preferência;
- API Client de sua preferência;

### Ambiente de desenvolvimento e execução:

Clone o projeto no link:

`git clone https://github.com/anaisa-teodoro/projeto-back-end-one-version1`

<p>Utilizado uma versão específica do Node a ser usada no projeto. Comando para salvar tal versão é</p>

`node -v >.nvmrc`

Linux | Windows

<p>Ativar a versão</p>

`nvm use 21`ou`nvm install 21`

### Configurando o Ambiente .env

- Para facilitar a configuração do ambiente, você pode usar o script `configure-env`, que lê um arquivo `.env.example`. Depois, gera um arquivo .env a partir desses valores.

- Ou criar manualmente um arquivo `.env`.
  Você pode instalar via CLI por meio nomde outro gerenciador de pacotes.
  O ideal é instalá-lo como uma dependência de desenvolvimento em vez de global:

### Instal as dev dependências

npm install configure-env --save-dev

### Rodar o repositório:

### Na primeira vez é necessário instalar as dependências:

1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`
4. `npm run db:create`

### Para rodar o repositório em ambiente local

5. `npm run start:dev`

### Trabalhando com migrations:

### Criar uma migration

6. `sequelize migration:generate --name `
7. `npx sequelize-cli migration:generate --name `

### Rodar uma migration. Opções:

8. Opção nº 1: `sequelize db:migrate`
9. Opção nº 2: `npx sequelize db:migrate`

### Reverter a última migration:

10. `sequelize-cli db:migrate:undo`
11. `npx sequelize-cli db:migrate:undo`

### Trabalhando com Seeders

### Criar valores iniciais no banco de dados:

12. `sequelize db:seed:all`
13. `npx sequelize db:seed:all`

### Endpoints de Usuário

#### Endpoints Públicos

| Endereço              | Verbo | Descrição             |
| --------------------- | ----- | --------------------- |
| `/api/usuario`        | POST  | Criar um novo usuário |
| `/api/usuarios/login` | POST  | Login do usuário      |


- Criar um novo usuário
```{
  "nome": "Eterna Aprendiz Js",
  "sexo": "Feminino",
  "cpf": "12245495874",
  "email": "eterna.aprendiz@dev.com",
  "senha": "FuturoDev@24",
  "endereco": "Rua do Github, porta 3000",
  "data_nascimento": "2023-12-20"
}
```

#### Endpoints Protegidos por Validação de Token

| Endereço                   | Verbo | Descrição                               |
| -------------------------- | ----- | --------------------------------------- |
| `/api/usuarios/:id`        | PUT   | Atualizar informações do usuário por ID |
| `/api/usuarios/:id/status` | PUT   | Atualizar status do usuário por ID      |
| `/api/usuarios/:id/senha`  | PUT   | Atualizar senha do usuário por ID       |
| `/api/usuarios/:id`        | GET   | Obter informações do usuário por ID     |

### Endpoints Local

### Endpoints Protegidos por Token

| Endereço                    | Verbo  | Descrição                   |
| --------------------------- | ------ | --------------------------- |
| `/api/local`                | POST   | Adicionar local             |
| `/api/local`                | GET    | Obter todos os locais       |
| `/api/local/:local_id`      | GET    | Obter local por ID          |
| `/api/local/:local_id`      | PUT    | Atualizar local por ID      |
| `/api/local/:id/status`     | PUT    | Atualizar status do local   |
| `/api/local/:local_id`      | DELETE | Excluir local por ID        |
| `/api/local/:local_id/maps` | GET    | Obter mapas do local por ID |

### Endpoints Protegidos com Token

| Endereço               | Verbo  | Descrição                   |
| ---------------------- | ------ | --------------------------- |
| `/api/localidades`     | POST   | Adicionar localidade        |
| `/api/localidades/:id` | PUT    | Atualizar localidade por ID |
| `/api/localidades/`    | GET    | Obter todas as localidades  |
| `/api/localidades/:id` | GET    | Obter localidade por ID     |
| `/api/localidades/:id` | DELETE | Excluir localidade por ID   |

---

Feito com carinho e muito aprendizado :)
