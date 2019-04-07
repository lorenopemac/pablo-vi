import { BoletinCursada } from '../../notas/boletines/boletinCursada';

export class EstadoAdmitido {
    _id: string;
    fechaInicio: Date;
    boletines: BoletinCursada[];
}
