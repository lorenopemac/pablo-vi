import { EstadoAdmitido } from './estadoAdmitido';
import { EstadoPostulante } from './estadoPostulante';

export class Alumno {
    _id: string;
    legajo: string;
    nombre: string;
    apellido: string;
    estadoAdmitido: EstadoAdmitido;
    estadoPostulante: EstadoPostulante;
    promedio: number;
}
