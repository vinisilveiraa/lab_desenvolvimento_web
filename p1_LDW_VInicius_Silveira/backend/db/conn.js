import mongoose from "mongoose";

async function main() {
    const databaseUrl = 'mongodb://127.0.0.1:27017/Doacoes';
    await mongoose.connect(databaseUrl);
    console.log('MongoDB Conectado')
}

main().catch((err) => {
    console.log(err);
});

export default mongoose;