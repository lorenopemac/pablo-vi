import { Curso } from '../../escolar/curso/curso';
import { ResultadosMateria } from './resultadosMateria';

export class BoletinCursada {
    _id: string;
    curso: Curso;
    resultados: ResultadosMateria[];
}
