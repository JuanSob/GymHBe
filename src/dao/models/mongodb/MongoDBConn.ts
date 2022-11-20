import { MongoClient } from "mongodb";

//Se crea una conección
let connection:MongoClient = null;

//Se crea una URI que se utiliza para poder conectarse, se le pone un callback por si no se encuentra la uri
let mongoURI = process.env.Mongo_URI || 'mongodb://localhost:27017';

//Decir a que bd nos vamos a conectar
let mongoDBName = process.env.MONGO_DB_NAME || 'sw202203';

export const getConnection = async ()=> {
    if (!connection)
    {
        connection = await MongoClient.connect(mongoURI);
    }
    return connection.db(mongoDBName);
}