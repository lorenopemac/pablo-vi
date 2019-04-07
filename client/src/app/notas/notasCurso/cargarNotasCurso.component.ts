import {Component, HostListener, OnInit, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { Curso } from '../../escolar/curso/curso';
import { Materia } from '../../escolar/materia/materia';
import { Alumno } from '../../personas/alumno/alumno';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { CargarNotasCursoService } from './cargarNotasCurso.service';

@Component({
    selector: 'app-notascurso',
    styleUrls: ['./cargarNotasCurso.component.scss'],
    templateUrl: './cargarNotasCurso.component.html'
})

export class CargarNotasCursoComponent implements OnInit {
    model: any[] = [];

    // Año
    anios = [];
    selectedAnio: number;

    // Cursos
    cursos: Curso[];
    selectedCurso: Curso;
    nivel: string;
    division: string;

    // Materias
    materias: Materia[];
    selectedMateria: Materia;

    // Alumnos
    alumnos: Alumno[];
    selectedAlumno: Alumno;
    alumnosCambiados: string[];

    hayCambios = false;

    constructor(
        private cargarNotasCursoService: CargarNotasCursoService,
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
            value: null
        });
        for (let i = 0; i <= limit; i++) {
            this.anios.push({
                label: anio - i,
                value: anio - i
              });
        }
    }

    getCursos() {
        this.cargarNotasCursoService.getCursos(this.selectedAnio)
        .then(cursos => {
            this.cursos = cursos;
        });
    }

    getMaterias() {
        this.nivel = this.selectedCurso.nivel.nombre;
        this.division = this.selectedCurso.division;
        this.cargarNotasCursoService.getMaterias(this.selectedCurso.nivel._id)
        .then(materias => {
            this.materias = materias;
        });
    }

    getAlumnos() {
        this.cargarNotasCursoService.getAlumnosAdmitidos(this.selectedCurso._id, this.selectedMateria._id)
        .then(alum => {
            this.alumnos = alum;
            console.log(alum);
        });
    }

    updateNotas(nota1: number, nota2: number, nota3: number, f: NgForm) {
        const boletines = this.selectedAlumno.estadoAdmitido.boletines;
        let boletin = null;
        let i = 0;
        while (!boletin && i < boletines.length ) {
            if (boletines[i].curso._id === this.selectedCurso._id) {
                boletin = boletines[i];
            }
            i++;
        }

        let result = null;
        i = 0;
        while (!result && i < boletin.resultados.length ) {
            if (boletin.resultados[i].materia._id === this.selectedMateria._id) {
                result = boletin.resultados[i];
            }
            i++;
        }

        if (nota1) {
            result.notaTrimestre1 = nota1;
        }
        if (nota2) {
            result.notaTrimestre2 = nota2;
        }
        if (nota3) {
            result.notaTrimestre3 = nota3;
        }

        f.reset();
    }

    notaValida(nota: number) {
        return (nota >= 1 && nota <= 10);
    }

    guardarNotas() {
        this.hayCambios = false;
        const alumnosJSON = JSON.stringify(this.alumnos);
        this.cargarNotasCursoService.saveNotasCurso(this.selectedCurso._id, this.selectedMateria._id, alumnosJSON)
        .then(alumnos => {
            swal({
                title: 'Calificaciones de Alumno Guardadas!',
                text: 'Se han guardado todas las calificaciones!',
                type: 'success',
                timer: 4000
              });
        });
    }

    cambiando(row) {
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
