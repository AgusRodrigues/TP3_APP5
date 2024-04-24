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

export type Dia = Actividad []; 

export interface Itinerario {
    id: number,
    viaje: Viaje,
    dias: Dia[]
}

export interface Lista{
    itinerarios: Itinerario[]
}

//Métodos 

export function agregarItinerario (viaje:Viaje, dias: Dia[]): Itinerario  { 
    // agrega Itinerario a la base de datos
}

export function borrartinerario (id: number) : void  { 
    // borra Itinerario a la base de datos consultandolo por su ID
}

export function consultarLista () : Lista {
    /// arma un listado que contiene todos los itinerarios
}
