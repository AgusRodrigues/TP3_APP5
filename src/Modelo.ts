//TP2 - Problema:
// Me gustaría conocer todo el mundo! Pero parece que el mundo es grande. Y hay muchas cosas para hacer en cada continente, país o ciudad al que voy. 
// Necesito que una aplicación me tire recomendaciones.
// La información que le quiero dar seria, mas o menos: el tiempo que me voy a ir de viaje, que tipo de viajero soy (de ciudad, vida nocturna, museos, naturaleza, etc.) y a que región del planeta quiero irme (continente, país o ciudad).
// La aplicación me debería armar un cronograma por día, donde me explique que hacer en todo momento.
// Y quiero poder tener varios viajes, que la aplicación me los guarde todos para poder volver a ellos cuando quiera.

// Entidades
export interface Viaje {
    destino: string,
    viajero: number,
    inicio: Date,
    fin: Date 
}

export interface Actividad {
    inicio: Date,
    fin: Date,
    nombre: string,
    descripcion: string
}

export interface Dia {
    fecha: Date,
    actividades: Actividad []; 
}

export interface Itinerario {
    id: number,
    viaje: Viaje,
    dias: Dia[],
    duracionViaje: number
}

export interface Lista{
    itinerarios: Itinerario[]
}

//Métodos 

export function agregarItinerario (viaje:Viaje): Itinerario  { 
    // llama a la funcion generadorDias y agregar el itinerario a la API
}

export function borrarItinerario (id: number) : void  { 
    // borra Itinerario a la base de datos consultandolo por su ID
}

export function consultarItinerario (id: number) : Itinerario  { 
    // borra Itinerario a la base de datos consultandolo por su ID
}
export function consultarLista () : Lista {
    /// arma un listado que contiene todos los itinerarios
}
/*
import { GeminiAPI } from 'gemini-api';

const geminiApi = new GeminiAPI({ key, secret, sandbox: true });
*/
export function generadorDias (viaje: Viaje) : Dia[] {

}



/*
import { GeminiAPI } from 'gemini-api';
import { v4 as uuidv4 } from 'uuid';
//inicializamos la api de gemini
const apiKey = 'your_api_key';
const apiSecret = 'your_api_secret';
const sandbox = true;

const geminiApi = new GeminiAPI({ key: apiKey, secret: apiSecret, sandbox: sandbox });
//inicializamos sqlite
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('creardb.sql');

module.exports = db;

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
  id: number;
  viaje: Viaje;
  dias: Dia[];
  duracionViaje: number;
}

export interface ListaItinerarios {
  itinerarios: Itinerario[];
}

// Métodos
//agrega itinerarios a los dias generados en generar listas dias
export async function agregarItinerario(viaje: Viaje): Promise<Itinerario> {
  const listaDias = await generarListaDias(viaje);
  const nuevoItinerario: Itinerario = {
    id: generarIdUnico(), // implementar un generador de ID único
    viaje,
    dias: listaDias,
    duracionViaje: listaDias.length,
  };
//usamos un try catch para que gemini genere los itinerarios
  try {
    const response = await geminiApi.itinerarios.create(nuevoItinerario);
    nuevoItinerario.id = response.id;
    return nuevoItinerario;
  } catch (error) {
    console.error('Error creating itinerary:', error);
    return null;
  }
}
//borramos los itinerarios de la base de datos
const borrarItinerario = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM itineraries WHERE id =?`, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Itinerary deleted successfully' });
      }
    });
  });
};
//consulta los contenidos de uno de los itinerarios usando su id
const consultarItinerario = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM itineraries WHERE id =?`, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  borrarItinerario,
  consultarItinerario,
};

//genera una lista de dias para el viaje
async function generarListaDias(viaje: Viaje): Promise<Dia[]> {
  const listaDias: Dia[] = [];
  for (let i = 0; i < duracionViaje(viaje); i++) {
    listaDias.push({ fecha: new Date(viaje.inicio.getTime() + i * 86400000), actividades: [] });
  }
  return listaDias;
}
//calcula la cantidad de dias que dura el viaje
function duracionViaje(viaje: Viaje): number {
  return Math.round((viaje.fin.getTime() - viaje.inicio.getTime()) / 86400000);
}
}*/