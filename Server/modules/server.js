import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import ClientRequestHandler from "./clientReqHandler.js";

export default class Server 
{
    constructor(port) 
    {
        this.app = express();
        this.app.use(cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));    
        
        this.port = port;

        this.router = new ClientRequestHandler(this.app);
    }

    start() 
    {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

