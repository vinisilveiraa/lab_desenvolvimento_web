import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: "API Gestão de Doações",
        description: "Sistema auxiliar ao controle de doações recebidas."
    },
    host: 'localhost:5000',
    basePath: '/Doacoes'
}

const outputFile = './swagger-output.json';

const endpointsFiles = [
    './Routes/routesDoacao.js'
];

swaggerAutogen()(outputFile, endpointsFiles, doc);