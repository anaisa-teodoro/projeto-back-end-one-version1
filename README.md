# Módulo I - Projeto Back-end - API Rest Natureza365

### Configurações iniciais:
  - Git; 
  - NodeJS;

### Ambiente de desenvolvimento e execução:

Clone o projeto no link:

`git clone https://github.com/anaisa-teodoro/projeto-back-end-one-version1`

Linux | Windows
<p>Salva a versão do Node a ser usada no projeto</p>

`node -v >.nvmrc`
<p>Ativar a versão</p>

`nvm use 21`ou`nvm install 21`


### Rodar o repositório:

### Na primeira vez é necessário instalar as dependencias:
1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`
4. `npm run db:create`

### Para rodar o repositório em ambiente local
5. `npm run start:dev`

### Trabalhando com migrations:

### Criar uma migration
6. `sequelize migration:generate --name nome_da_migracao`
7. `npx sequelize-cli migration:generate --name criar_tabela_alunos`
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

---
Feito com carinho :)
# projeto-back-end-one-version1
