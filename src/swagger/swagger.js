const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "projeto-back-end-one",
    description:
      "teste-projeto-back-end-one",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  usuarios: ["application/json"],
  locais: ["application/json"],
  tags: [
    {
      name: "Usuários",
      description: "Endpoints de Usuários",
    },
    {
      name: "Locais",
      description: "Endpoints de Locais",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  security: [
    {
      apiKeyAuth: [],
    },
  ],
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe",
    },
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: "#/definitions/Parents",
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2024,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company",
          },
        },
      ],
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: "",
    },
  },
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../index"); // Your project's root file
});
