import {Component, HostListener, OnInit, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { Curso } from '../../escolar/curso/curso';
import { CursoService } from '../../escolar/curso/curso.service';
import { Materia } from '../../escolar/materia/materia';
import { MateriaService } from '../../escolar/materia/materia.service';
import { Alumno } from '../../personas/alumno/alumno';
import { AlumnoService } from '../../personas/alumno/alumno.service';
import { Profesor } from '../../personas/profesor/profesor';
import { EstadoPostulante } from '../../personas/alumno/estadoPostulante';
import { ExamenIngreso } from '../../escolar/examenIngreso/examenIngreso';
import { ExamenIngresoService } from '../../escolar/examenIngreso/examenIngreso.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { CargarNotasIngresoService } from './cargarNotasIngreso.service';

@Component({
    selector: 'app-notasingreso',
    styleUrls: ['./cargarNotasIngreso.component.scss'],
    templateUrl: './cargarNotasIngreso.component.html'
})

export class CargarNotasIngresoComponent implements OnInit {
    model: any[] = [];

    // Año
    anios = [];
    selectedAnio: number;

    // Cursos
    cursos: Curso[];
    selectedCurso: Curso;
    nivel: string;

    // Examenes
    examenes: ExamenIngreso[];
    selectedExamen: ExamenIngreso;

    // Materias
    materias: Materia[];
    selectedMateria: Materia;

    // Alumnos
    alumnos: Alumno[];
    selectedAlumno: Alumno;

    hayCambios = false;

    constructor(
        private cargarNotasIngresoService: CargarNotasIngresoService,
        private location: Location
    ) { }


    ngOnInit(): void {
        this.getAnios();
        this.selectedAnio = null;
    }

    getAnios() {
        const anio = new Date().getFullYear();
        const limit = anio - 1994;
        this.anios.push({
            label: 'Seleccionar',
            value: -1
        });
        for (let i = 0; i <= limit; i++) {
            this.anios.push({
                label: anio - i,
                value: anio - i
              });
        }
    }

    getCursos() {
        this.cargarNotasIngresoService.getCursos(this.selectedAnio)
        .then(cursos => {
            console.log('CURSOS: ', cursos);
            for (let index = 0; index < cursos.length; index++) {
                if (cursos[index].division === 'B') {
                    cursos.splice(index, 1);
                }
            }
            this.cursos = cursos;
        });
    }

    getExamenes() {
        this.nivel = this.selectedCurso.nivel.nombre;
        this.cargarNotasIngresoService.getExamenesIngreso(this.selectedAnio, this.selectedCurso.nivel._id)
        .then(exa => {
            console.log('EXAMENES INGRESO: ', exa);
            this.examenes = exa;
        });
    }

    getIngresantes() {
        this.cargarNotasIngresoService.getAlumnosPostulantes(this.selectedCurso._id, this.selectedExamen._id)
        .then(alum => {
            console.log('ALUMNOS: ', alum);
            this.alumnos = alum;
        });
    }

    formatNombreProfesor(profe: Profesor) {
        if (profe) {
            return profe.nombre + ' ' + profe.apellido + ' (' + profe.legajo + ')';
        } else {
            return '';
        }
    }

    formatNota(al: Alumno) {
        const resultadosIngreso = al.estadoPostulante.boletinIngreso.resultados;
        let result = null;
        let i = 0;
        while (!result && i < resultadosIngreso.length ) {
            if (resultadosIngreso[i].examenIngreso._id === this.selectedExamen._id) {
                result = resultadosIngreso[i];
            }
            i++;
        }

        if (result) {
            return result.nota;
        } else {
            return 0;
        }
    }

    updateNota(nota: number, f: NgForm) {
        const resultadosIngreso = this.selectedAlumno.estadoPostulante.boletinIngreso.resultados;
        let result = null;
        let i = 0;
        while (!result && i < resultadosIngreso.length ) {
            if (resultadosIngreso[i].examenIngreso._id === this.selectedExamen._id) {
                result = resultadosIngreso[i];
            }
            i++;
        }

        if (nota) {
            result.nota = nota;
        }

        f.reset();
    }

    notaValida(nota: number) {
        return (nota >= 1 && nota <= 10);
    }

    guardarNotas() {
        this.hayCambios = false;
        const alumnosJSON = JSON.stringify(this.alumnos);
        this.cargarNotasIngresoService.saveNotasIngreso(this.selectedCurso._id, this.selectedExamen._id, alumnosJSON)
        .then(alumnos => {
            swal({
                title: 'Calificaciones de Alumno Guardadas!',
                text: 'Se han guardado todas las calificaciones!',
                type: 'success',
                timer: 4000
              });
        });
    }

    cambiando() {
        this.hayCambios = true;
    }

    goBack() {
        this.location.back();
    }

    async canDeactivate() {
        let ret = true;
        if (this.hayCambios) {
            ret = await swal({
                title: 'ALERTA: HAY CAMBIOS SIN GUARDAR!!',
                text: 'Seguro que quieres salir?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar'
                }).then(
                    res => {
                    return res.value;
                    }
                );
        }

        return ret;
    }

    @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
        console.log('Processing beforeunload...');
        event.returnValue = false;
    }
}
