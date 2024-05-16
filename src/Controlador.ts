import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();
//para que acepte json
//aca iria un function errorHandler()
app.use(express.json());
/*
aca van los endpoints de nuestra api como agregar itinerarios, borrarlos y consultarlos
todos serian con post menos el de consulta
hacer try catch en los endpoints con en el catch un next(error), esto pasa al siguiente endpoint hasta que llegue al error handler
el error handler es app.use(errorHandler);

ejemplo de ruta

"v1/itinerario/agregar"

"v1/itinerario/borrar"

"v1/itinerario" --> este es para consultar





*/
app.get("/", (req: Request, res: Response) => {
    res.send("Hola mundo!");
});

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);});


