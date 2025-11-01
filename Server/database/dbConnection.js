import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default class DatabaseConnection 
{
    constructor() 
    {
        this.connect();
    }

    getConnectionString()
    {
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const cluster = process.env.MONGO_CLUSTER;
        const appName = process.env.MONGO_APPNAME;
        const database = process.env.MONGO_DATABASE;

        const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

        return uri;
    }

    async connect() 
    {
        const uri = this.getConnectionString();

        try 
        {
            await mongoose.connect(uri);
            console.log("MongoDB connected!");
        } 
        catch (error)
        {
            console.log(`Error connecting to MongoDB: ${error}`);
        }
    }
}