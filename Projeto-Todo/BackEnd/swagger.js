import swaggerAutoGen from "swagger-autogen";

const doc = {
    info: {
        title: 'API ToDo List',
        description: 'Documentação para geração automatica dos testes'
    },
    host: 'localhost:5000',
    basePath: '/ToDo'
}

// nome do arquivo que seja gerado automaticamente
const outputFile = './swagger-outputFile';
// caminho para as rotas
const routesFile = ['./Routes/routes.js'];

swaggerAutoGen()(
    outputFile, routesFile, doc
)
