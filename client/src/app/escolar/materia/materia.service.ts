import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Materia } from './materia';
import { default as swal } from 'sweetalert2';

@Injectable()
export class MateriaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private materiaURL = this.urlService.getRestApiUrl() + '/materia';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getMaterias(nivel: string): Promise<Materia[]> {
        return this.http.get(this.materiaURL + '/' + nivel)
        .toPromise()
        .then(response => response.json().obj as Materia[])
        .catch(this.handleError);
    }

    getMateria() {

    }

    updateMateria() {

    }

    saveMateria() {

    }

    deleteMateria() {

    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Materias: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
