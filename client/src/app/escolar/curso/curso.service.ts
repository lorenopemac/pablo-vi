import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Curso } from './curso';
import { default as swal } from 'sweetalert2';

@Injectable()
export class CursoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private cursoURL = this.urlService.getRestApiUrl() + '/curso';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getCursos(selectedAnio: number): Promise<Curso[]> {
        return this.http.get(this.cursoURL + '/' + selectedAnio)
        .toPromise()
        .then(response => response.json().obj as Curso[])
        .catch(this.handleError);

    }

    getCurso(idCurso: string): Promise<Curso> {
        return this.http.get(this.cursoURL + '/' + idCurso)
        .toPromise()
        .then(response => response.json().obj as Curso)
        .catch(this.handleError);
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
