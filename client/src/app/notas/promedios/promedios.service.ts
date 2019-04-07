import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Alumno } from '../../personas/alumno/alumno';
import { default as swal } from 'sweetalert2';
import { Curso } from '../../escolar/curso/curso';
import { ExamenIngreso } from '../../escolar/examenIngreso/examenIngreso';
import { Materia } from '../../escolar/materia/materia';

@Injectable()
export class PromediosService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private promediosUrl = this.urlService.getRestApiUrl() + '/promedios';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getCursos(selectedAnio: number): Promise<Curso[]> {
        return this.http.get(this.promediosUrl + '/obtenerCursos/' + selectedAnio)
        .toPromise()
        .then(response => response.json().obj as Curso[])
        .catch(this.handleError);
    }

    getAlumnosAdmitidosCursos(idCurso: string): Promise<Alumno[]> {
        return this.http.get(this.promediosUrl + '/admitidos/' + idCurso)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }



    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Notas Curso: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
