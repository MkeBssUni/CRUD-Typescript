/* Required External Modules */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config(); //Permite importar variables del archivo .env

/* App Variables */

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/* App Configuration */

app.use(helmet()); //Ayuda a setear HTTP response headers
app.use(cors());
app.use(express.json());

/* Server Activation */

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`);
})