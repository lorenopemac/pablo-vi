import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Profesor } from './profesor';
import { default as swal } from 'sweetalert2';

@Injectable()
export class ProfesorService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private profesorURL = this.urlService.getRestApiUrl() + '/profesor';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getProfesores(idMateria: string): Promise<Profesor[]> {
        return this.http.get(this.profesorURL +'/'+idMateria)
        .toPromise()
        .then(response => response.json().obj as Profesor[])
        .catch(this.handleError);
    }

    getProfesor() {

    }

    updateProfesor() {

    }

    saveProfesor() {

    }

    deleteProfesor() {

    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Profesor: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
