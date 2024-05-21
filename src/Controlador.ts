import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { request } from "http";
import {
  agregarItinerario,
  borrarItinerario,
  consultarItinerario,
} from "./Modelo";

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

*/

app.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo!");
});

app.post("/v1/itinerario/agregar", (req: Request, res: Response) => {
  const { viaje, id } = req.body;
  agregarItinerario(viaje, id)
    .then((itinerario) => {
      if (itinerario) {
        res.status(201).send({ message: "Itinerary added successfully" });
      } else {
        res.status(500).send({ message: "Error adding itinerary" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error adding itinerary" });
    });
});

app.post("/v1/itinerario/borrar", (req: Request, res: Response) => {
  const { id } = req.body;
  borrarItinerario(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error deleting itinerary" });
    });
});

app.get("/v1/itinerario/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  consultarItinerario(id)
    .then((itinerario) => {
      if (itinerario) {
        res.send(itinerario);
      } else {
        res.status(404).send({ message: "Itinerary not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error retrieving itinerary" });
    });
});
app.listen(port, () => {
  console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});
