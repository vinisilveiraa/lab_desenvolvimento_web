
import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const doc = {
    info: {
        title: "API Gestão de Ecopontos",
        description: "Sistema auxiliar ao controle de ecopontos.",
        version: "1.0.0"
    },
    host: "localhost:5000",
    basePath: "/Ecopontos",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
};

const outputFile = "./swagger-output.json";

const endpointsFiles = [
    "./Routes/EcopontoRoutes.ts",
    "./Routes/LixeiraRoutes.ts",
    "./Routes/UsuarioRoutes.ts"
];

try {
    await swagger(outputFile, endpointsFiles, doc);
    console.log("Swagger gerado com sucesso!");
} catch (error) {
    console.error("Erro ao gerar Swagger:", error);
    process.exit(1);
}
