import { MongoClient, Database } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

let connection: Database;

export function connectDatabase() {
    const client = new MongoClient();

    client.connectWithUri("mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net");
    
    connection = client.database('deno-todo-app');
}

export function getDatabaseConnection() {
    return connection;
}