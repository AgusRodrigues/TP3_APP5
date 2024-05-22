"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var Modelo_1 = require("./Modelo");
dotenv_1.default.config();
var port = process.env.PORT || 3000;
var app = (0, express_1.default)();
//para que acepte json
//aca iria un function errorHandler()
app.use(express_1.default.json());
/*
aca van los endpoints de nuestra api como agregar itinerarios, borrarlos y consultarlos
todos serian con post menos el de consulta
hacer try catch en los endpoints con en el catch un next(error), esto pasa al siguiente endpoint hasta que llegue al error handler
el error handler es app.use(errorHandler);

*/
app.get("/", function (req, res) {
    res.send("Hola mundo!");
});
app.post("/v1/itinerario/agregar", function (req, res) {
    var _a = req.body, viaje = _a.viaje, id = _a.id;
    (0, Modelo_1.agregarItinerario)(viaje, id)
        .then(function (itinerario) {
        if (itinerario) {
            res.status(201).send({ message: "Itineario agreado perfectamente" });
        }
        else {
            res.status(500).send({ message: "Hubo un error agregando el itineario" });
        }
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "Hubo un error agregando el itineario" });
    });
});
app.post("/v1/itinerario/borrar", function (req, res) {
    var id = req.body.id;
    (0, Modelo_1.borrarItinerario)(id)
        .then(function (result) {
        res.send(result);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "Hubo un error borrando el itineario" });
    });
});
app.get("/v1/itinerario/:id", function (req, res) {
    var id = req.params.id;
    (0, Modelo_1.consultarItinerario)(id)
        .then(function (itinerario) {
        if (itinerario) {
            res.send(itinerario);
        }
        else {
            res.status(404).send({ message: "Itineario no encontrado" });
        }
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send({ message: "Hubo un error al consultar el itineario" });
    });
});
app.listen(port, function () {
    console.log("[server]: Servidor iniciado en http://localhost:".concat(port));
});
