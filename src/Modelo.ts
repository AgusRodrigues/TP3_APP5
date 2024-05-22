//TP2 - Problema:
// Me gustaría conocer todo el mundo! Pero parece que el mundo es grande. Y hay muchas cosas para hacer en cada continente, país o ciudad al que voy.
// Necesito que una aplicación me tire recomendaciones.
// La información que le quiero dar seria, mas o menos: el tiempo que me voy a ir de viaje, que tipo de viajero soy (de ciudad, vida nocturna, museos, naturaleza, etc.) y a que región del planeta quiero irme (continente, país o ciudad).
// La aplicación me debería armar un cronograma por día, donde me explique que hacer en todo momento.
// Y quiero poder tener varios viajes, que la aplicación me los guarde todos para poder volver a ellos cuando quiera.

// Entidades

import { GeminiAPI } from "gemini-api";
import * as sqlite3 from "sqlite3";

// inicializamos la api de gemini

const apiKey = "AIzaSyDoVhBFXEo3Kohnlp3jfTsr65Gr8RHi8vI";
const apiSecret = "AIzaSyDoVhBFXEo3Kohnlp3jfTsr65Gr8RHi8vI";
const sandbox = true;
const geminiApi = new GeminiAPI({
  key: apiKey,
  secret: apiSecret,
  sandbox: sandbox,
});

// inicializamos sqlite
const db = new sqlite3.Database("creardb.sql");

export interface Viaje {
  destino: string;
  viajero: number;
  inicio: Date;
  fin: Date;
}

export interface Actividad {
  inicio: Date;
  fin: Date;
  nombre: string;
  descripcion: string;
}

export interface Dia {
  fecha: Date;
  actividades: Actividad[];
}

export interface Itinerario {
  viaje: Viaje;
  dias: Dia[];
  duracionViaje: number;
}

async function agregarItinerario(viaje: Viaje, id: string): Promise<Itinerario | null> {
  const listaDias = await generarListaDias(viaje);

  const nuevoItinerario: Itinerario = {
    viaje,
    dias: listaDias,
    duracionViaje: listaDias.length,
  };

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO itineraries (id, viaje, dias, duracionViaje) VALUES (?, ?, ?, ?)`,
      [id, JSON.stringify(viaje), JSON.stringify(listaDias), listaDias.length],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(nuevoItinerario);
        }
      }
    );
  });
}

async function generarActividadesParaDia(viaje: Viaje, fecha: Date): Promise<Actividad[]> {
  // usamos la api para generar un request de actividades
  const response = await geminiApi.request({
    method: "GET",
    path: "/actividades",
    query: {
      lugar: viaje.destino,
      fecha: fecha.toISOString(),
    },
  });

  const actividades: Actividad[] = response.data.activities.map((activity: any) => ({
    inicio: new Date(activity.start_time),
    fin: new Date(activity.end_time),
    nombre: activity.name,
    descripcion: activity.description,
  }));

  return actividades;
}

async function generarListaDias(viaje: Viaje): Promise<Dia[]> {
  const listaDias: Dia[] = [];
  for (let i = 0; i < duracionViaje(viaje); i++) {
    const fecha = new Date(viaje.inicio.getTime() + i * 86400000);
    const actividades = await generarActividadesParaDia(viaje, fecha); // Aca llamamos a la api
    listaDias.push({
      fecha,
      actividades,
    });
  }
  return listaDias;
}

function duracionViaje(viaje: Viaje): number {
  return Math.round((viaje.fin.getTime() - viaje.inicio.getTime()) / 86400000);
}

const borrarItinerario = (id: string): Promise<{ message: string }> => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM itineraries WHERE id =?`, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Itinerario borrado sin problemas" });
      }
    });
  });
};

const consultarItinerario = (id: string): Promise<Itinerario> => {
  return new Promise((resolve, reject) => {
    db.get<Itinerario>(
      `SELECT * FROM itineraries WHERE id =?`,
      id,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

export { agregarItinerario, borrarItinerario, consultarItinerario };
