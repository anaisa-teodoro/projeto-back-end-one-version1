const { sign } = require("jsonwebtoken");

async function validarBody(body) {
  const {
    nome,  
    data_nascimento,
    cpf,
    email,
    senha,
  } = body;
  if (
    !email ||
    !nome ||
    !data_nascimento ||
    !cpf ||
    !senha 
   
  ) {
    return false;
  }
  return true;
}

async function filtroPlataforma(body) {
  const {
    nome,  
    sexo,
    data_nascimento,
    cpf,
    telefone,
    email,
    senha,
  } = body;
  const novos_dados = {};
  if (sexo) {
    novos_dados.sexo = sexo;
  }
  if (email) {
    novos_dados.email = email;
  }
  if (nome) {
    novos_dados.nome = nome;
  }
  if (data_nascimento) {
    novos_dados.data_nascimento = data_nascimento;
  }
  if (cpf) {
    novos_dados.cpf = cpf;
  }
  if (senha) {
    novos_dados.senha = senha;
  }
  if (telefone) {
    novos_dados.telefone = telefone;
  }


  return novos_dados;
}
async function informoEmailESenha(body) {
  const { email, senha } = body;
  if (!email || !senha) {
    return false;
  }
  return true;
}
async function gerarToken(Usuarios, body, res) {
  //pegamos o usuario da base de dados
  const user = await Usuarios.findOne({
    where: {
      email: body.email,
    },
  });

  //validar se o usuario esta ativo na base de dados
  if (user.status === "inativo") {
    res.status(401);
    throw new Error("Seu usuario esta inativo");
  }
  //validar senha
  if (body.senha === user.senha) {
    //gerar payload
    const payload = { status: user.status, id: user.id };
    //gerar token
    const token = sign(payload, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    //devolver o token para o cliente
    return res.status(200).json({
      token,
    });
  } else {
    res.status(401);
    throw new Error("Email ou senha estão inválidos");
  }
}
module.exports = {
  validarBody,
  filtroPlataforma,
  informoEmailESenha,
  gerarToken,
};
