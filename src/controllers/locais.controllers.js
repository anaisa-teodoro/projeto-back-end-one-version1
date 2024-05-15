const Locais = require("../models/Locais");
const {
  validarBody,
  filtroUpdate,
  filtroStatus,
  filtroPlataforma,
} = require("../libs/locais.lib");
const { estaNaBD, usuarioEstaAtivo } = require("../libs/validators");

module.exports = {
  async plataforma(req, res) {
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      const body = req.body;
      //verificar que o usuario não tenha um local ya cadastrado
      if (await estaNaBD(Locais, "usuario_id", usuario_id)) {
        res.status(409);
        throw new Error("Usuário já possui um local cadastrado");
      }
      // Validar se o body da requisição contem os campos necessários para criar um novo local
      if (!(await validarBody(body, usuario_id))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos");
      }
      //cpf esta na db ?
      if (await estaNaBD(Locais, "cpf", body.cpf)) {
        res.status(409);
        throw new Error("CPF já cadastrado");
      }
      //email esta na db ?
      if (await estaNaBD(Locais, "email", body.email)) {
        res.status(409);
        throw new Error("Email já cadastrado");
      }
      //nome está na db ?
      if (await estaNaBD(Locais, "nome_local", body.nome_local)) {
        res.status(409);
        throw new Error("Nome já cadastrado");
      }


      //criar novo local na db
      const local = await Locais.create(await filtroPlataforma(body, usuario_id));
      res.json(local);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async update(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuário que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro é número
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findByPk(id);
      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      //verificar se o local esta ativo
      if (local.status !== "ativo") {
        res.status(403);
        throw new Error("Local esta inativo");
      }
      //filtrar dados do body
      const novos_dados = await filtroUpdate(req, res);
      //verificar se o usuario que esta requisitando  esta com status ativo
      if (req.payload.status !== "ativo") {
        res.status(403);
        throw new Error("Usuário não autorizado");
      }
      //verificar as unique da tabela local antes de tentar atualizar 
      if (novos_dados.nome_local && await estaNaBD(Locais, "nome_local", novos_dados.nome_local)) {
        res.status(409);
        throw new Error("nome_local ja cadastrado")
      }
      // Atualizar o local caso exista novos dados
      novos_dados && (await local.update(novos_dados));
      res.sendStatus(204);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async status(req, res) {
    const usuario_id = req.payload.id;
    const id = req.params.id;

    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);

      if (isNaN(id)) {
        //verificar se o id passado por parâmetro  e número
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findByPk(id);
      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      // filtrar dados do body
      const novo_status = await filtroStatus(req, res);
      // Atualizar o local caso exista novos dados
      novo_status && (await local.update(novo_status));
      res.sendStatus(204);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async index(req, res) {
    const status = req.query.status;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o status passado por parâmetro  e válido
      if (status && !["ativo", "inativo"].includes(status.toLowerCase())) {
        res.status(400);
        throw new Error("Status na query params inválido!");

      }

      // garantir que o status seja passado em minúsculo
      const status_pesquisado = status ? { status: status.toLowerCase() } : {};
      // Listar todos os locals ativos ou inativos segundo o status seja passado por query params
      const Locais = await Locais.findAll({
        where: status_pesquisado,
        include: {
          association: "usuario",
          attributes: ["nome", "email", "status"],
        },
      });
      //  verifica se o status foi passado por query params, caso sim,
      //  retorna um objeto com o status passado por parâmetro e setea o nome 
      //  do objeto com o status [exemplo : locals_ativos ] caso contrário, 
      //  retorna um objeto com o nome Locais e o array de todos os Locais
      status
        ? res.json({
          ["locais" + String(status).toLocaleLowerCase()]: Locais,
        })
        : res.json({ Locais });
    } catch (error) {
      return res.json(error.message);
    }
  },
  async indexId(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findByPk(id, {
        attributes: [
          "id",
          "status",
          "nome_local",
          "cpf",
          "email",    
          "cep",
          "estado",
          "cidade",
          "bairro",
          "logradouro",
          "numero",
          "complemento",
          "lat",
          "lon",
        ],
        include: {
          association: "usuario",
          attributes: ["nome", "email", "status"],
        },
      });
      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      res.json(local);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async deleteId(req, res) {
    const id = req.params.id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico!"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findByPk(id, {
        include: {
          association: "localidades",
        },
      });
      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      //verificar se o local esta ativo
      if (local.status !== "inativo") {
        res.status(403);
        throw new Error("Local esta ativo, não pode ser deletado");
      }
      //verificar se o local esta vinculado a algum localidade
      if (local.localidades.length > 0) {
        res.status(403);
        throw new Error(
          "Local esta vinculado a algum localidade, não pode ser deletado"
        );
      }
      //deletar local
      await local.destroy();
      res.sendStatus(204);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
