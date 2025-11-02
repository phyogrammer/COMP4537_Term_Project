import dotenv from "dotenv";
dotenv.config();

import Server from "./modules/server.js";
import DatabaseConnection from "./database/dbConnection.js";

const PORT = process.env.PORT || 3000;

class Application 
{
    constructor()
    {
        this.server = new Server(PORT);

        this.connectToDatabase();

        this.startServer();
    }

    async connectToDatabase()
    {
        this.dbConnection = new DatabaseConnection();
    }
    
    startServer()
    {
        this.server.start();
    }
}

new Application();