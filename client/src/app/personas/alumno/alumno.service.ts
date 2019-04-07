import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Alumno } from './alumno';
import { default as swal } from 'sweetalert2';
import { Curso } from '../../escolar/curso/curso';
import { ExamenIngreso } from '../../escolar/examenIngreso/examenIngreso';

@Injectable()
export class AlumnoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private alumnoURL = this.urlService.getRestApiUrl() + '/alumno';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getAlumnosPostulantes(idCurso: string, idExamenIngreso: string): Promise<Alumno[]> {
        return this.http.get(this.alumnoURL + '/postulantes/' + idCurso + '/' + idExamenIngreso)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    getAlumnosAdmitidos(idCurso: string, idMateria: string): Promise<Alumno[]> {
        return this.http.get(this.alumnoURL + '/admitidos/' + idCurso + '/' + idMateria)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    getCurso() {

    }

    updateCurso() {

    }

    saveCurso() {

    }

    deleteCurso() {

    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Cursos: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
