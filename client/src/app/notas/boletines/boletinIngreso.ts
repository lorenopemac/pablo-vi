import { ResultadosExamenIng } from './resultadosExamenIng';
import { Curso } from '../../escolar/curso/curso';

export class BoletinIngreso {
    _id: string;
    curso: Curso;
    resultados: ResultadosExamenIng[];
}
