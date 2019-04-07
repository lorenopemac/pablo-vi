import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';
import { Alumno } from '../../personas/alumno/alumno';
import { default as swal } from 'sweetalert2';
import { Curso } from '../../escolar/curso/curso';
import { Materia } from '../../escolar/materia/materia';

@Injectable()
export class CargarNotasCursoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private cargarNotasCursoUrl = this.urlService.getRestApiUrl() + '/cargarNotasCurso';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getCursos(selectedAnio: number): Promise<Curso[]> {
        return this.http.get(this.cargarNotasCursoUrl + '/obtenerCursos/' + selectedAnio)
        .toPromise()
        .then(response => response.json().obj as Curso[])
        .catch(this.handleError);

    }

    getMaterias(idNivel: string): Promise<Materia[]> {
        return this.http.get(this.cargarNotasCursoUrl + '/obtenerMaterias/' + idNivel)
        .toPromise()
        .then(response => response.json().obj as Materia[])
        .catch(this.handleError);
    }

    getAlumnosAdmitidos(idCurso: string, idMateria: string): Promise<Alumno[]> {
        return this.http.get(this.cargarNotasCursoUrl + '/admitidos/' + idCurso + '/' + idMateria)
        .toPromise()
        .then(response => response.json().obj as Alumno[])
        .catch(this.handleError);
    }

    saveNotasCurso(idCurso: string, idMateria: string, listaAlumnos: string) {
        console.log(listaAlumnos);
        return this.http.patch(this.cargarNotasCursoUrl + '/notasCurso/' + idCurso + '/' + idMateria,
        JSON.stringify({alumnos: listaAlumnos}), {headers: this.headers})
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
