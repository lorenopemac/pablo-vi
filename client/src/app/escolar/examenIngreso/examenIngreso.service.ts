import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { ExamenIngreso } from './examenIngreso';
import { default as swal } from 'sweetalert2';
import { Profesor } from '../../personas/profesor/profesor';
import { Alumno } from '../../personas/alumno/alumno';
import { Curso } from '../../escolar/curso/curso';
import { Materia } from '../../escolar/materia/materia';

@Injectable()
export class ExamenIngresoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private examenIngresoURL = this.urlService.getRestApiUrl() + '/altaExamenIngreso';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getExamenesIngreso(anio: number, nivel: string): Promise<ExamenIngreso[]> {
        return this.http.get(this.examenIngresoURL + '/obtenerExamenes/' + anio + '/' + nivel)
        .toPromise()
        .then(response => response.json().obj as ExamenIngreso[])
        .catch(this.handleError);
    }

    getCursos(selectedAnio: number): Promise<Curso[]> {
        return this.http.get(this.examenIngresoURL + '/obtenerCursos/' + selectedAnio)
        .toPromise()
        .then(response => response.json().obj as Curso[])
        .catch(this.handleError);
    }

    getProfesores(selectedMateria: string): Promise<Profesor[]> {
        return this.http.get(this.examenIngresoURL + '/obtenerProfesores/' + selectedMateria)
        .toPromise()
        .then(response => response.json().obj as Profesor[])
        .catch(this.handleError);
    }

    getMaterias(nivel: string): Promise<Materia[]> {
        return this.http.get(this.examenIngresoURL + '/obtenerMaterias/' + nivel)
        .toPromise()
        .then(response => response.json().obj as Materia[])
        .catch(this.handleError);
    }

    getAlumnosPostulantes(selectedCurso: string): Promise<Alumno[]> {
        return this.http.get(this.examenIngresoURL + '/obtenerPostulantes/' + selectedCurso)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    getExamenIngreso() {

    }

    updateExamenIngreso() {

    }

    saverExamenIngreso(fech: Date , idProfe: string, idMat: string, idCur: string): Promise<ExamenIngreso> {
        return this.http.post(this.examenIngresoURL + '/guardarExamenIngreso',
             JSON.stringify({fecha: fech, idProfesor: idProfe, idMateria: idMat, idCurso: idCur}),
             {headers: this.headers}).toPromise()
             .then(response => response.json().obj as ExamenIngreso[])
             .catch(this.handleError);

    }

    deleteExamenIngreso() {

    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Examen Ingreso: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
