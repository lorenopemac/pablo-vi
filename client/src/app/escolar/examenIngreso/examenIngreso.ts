import { Materia } from '../materia/materia';
import { Profesor } from '../../personas/profesor/profesor';

export class ExamenIngreso {
    _id: string;
    fecha: Date;
    profesor: Profesor;
    materia: Materia;
}
