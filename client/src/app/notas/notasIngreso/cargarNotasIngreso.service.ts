import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Alumno } from '../../personas/alumno/alumno';
import { default as swal } from 'sweetalert2';
import { Curso } from '../../escolar/curso/curso';
import { ExamenIngreso } from '../../escolar/examenIngreso/examenIngreso';
import { Materia } from '../../escolar/materia/materia';

@Injectable()
export class CargarNotasIngresoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private cargarNotasIngresoUrl = this.urlService.getRestApiUrl() + '/cargarNotasIngreso';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getCursos(selectedAnio: number): Promise<Curso[]> {
        return this.http.get(this.cargarNotasIngresoUrl + '/obtenerCursos/' + selectedAnio)
        .toPromise()
        .then(response => response.json().obj as Curso[])
        .catch(this.handleError);

    }

    getExamenesIngreso(anio: number, nivel: string): Promise<ExamenIngreso[]> {
        return this.http.get(this.cargarNotasIngresoUrl + '/obtenerExamenes/' + anio + '/' + nivel)
        .toPromise()
        .then(response => response.json().obj as ExamenIngreso[])
        .catch(this.handleError);
    }

    getAlumnosPostulantes(idCurso: string, idExamenIngreso: string): Promise<Alumno[]> {
        return this.http.get(this.cargarNotasIngresoUrl + '/postulantes/' + idCurso + '/' + idExamenIngreso)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    saveNotasIngreso(idCurso: string, idExamenIngreso: string, listaPostulantes: string) {
        console.log(listaPostulantes);
        return this.http.patch(this.cargarNotasIngresoUrl + '/notasIngreso/' + idCurso + '/' + idExamenIngreso,
        JSON.stringify({postulantes: listaPostulantes}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Notas Ingreso: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
