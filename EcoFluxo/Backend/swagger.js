import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: "API Gestão de Ecopontos",
        description: "Sistema auxiliar ao controle de ecopontos."
    },
    host: 'localhost:5000',
    basePath: '/Ecopontos'
}

const outputFile = './swagger-output.json';

const endpointsFiles = [
    './Routes/EcopontoRoutes.js',
    './Routes/LixeiraRoutes.js',
    './Routes/UsuarioRoutes.js'
];

swaggerAutogen()(outputFile, endpointsFiles, doc);