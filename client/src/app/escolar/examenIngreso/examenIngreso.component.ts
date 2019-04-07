import {Component, Output, OnInit, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { Curso } from '../curso/curso';
import { CursoService } from '../curso/curso.service';
import { Nivel } from '../nivel/nivel';
import { Alumno } from '../../personas/alumno/alumno';
import { Profesor } from '../../personas/profesor/profesor';
import { Materia } from '../materia/materia';
import { DateFormatterService } from '../../datepicker/dateFormatter.service';
import { default as swal } from 'sweetalert2';
import { ExamenIngreso } from './examenIngreso';
import { NgForm } from '@angular/forms';
import { ProfesorService } from '../../personas/profesor/profesor.service';
import { MateriaService } from '../materia/materia.service';
import { ExamenIngresoService } from './examenIngreso.service';
import { AlumnoService } from '../../personas/alumno/alumno.service';

@Component({
    selector: 'app-exameningreso',
    styleUrls: ['./examenIngreso.component.scss'],
    templateUrl: './examenIngreso.component.html'
})

export class ExamenIngresoComponent implements OnInit {
    // Nivel
    niveles = [];
    selectedNivel: number;

    // Fecha Inicio
    fechaInicioGuardada: string;
    currentFechaInicio = new Date();

    // Año
    anios = [];
    selectedAnio: number;

    // Profesores
    profesores: Profesor[];
    selectedProfesor: Profesor;

    // Año
    dias = [];
    selectedDia: number;

    // Año
    meses = [];
    selectedMes: number;

    // Cursos
    cursos: Curso[];
    selectedCurso: Curso;
    cols: any[];
    nivel: string;

    // Postulante
    postulantes: Alumno[];
    togglePostulantes = false;


    // Materia
    materias: Materia[];
    selectedMateria: Materia;

    // Examenes
    examenesIngreso: ExamenIngreso[];
    selectedExamenIngreso: ExamenIngreso;

    selectedBoton: String;

    constructor(
        private dateFormatterService: DateFormatterService,
        private location: Location,
        private cursoService: CursoService,
        private profesorService: ProfesorService,
        private materiaService: MateriaService,
        private examenService: ExamenIngresoService,
        private alumnoService: AlumnoService
    ) { }

    ngOnInit(): void {
        this.getAnios();
        this.getDias();
        this.getMeses();
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }

    getPostulantes() {
        this.examenService.getAlumnosPostulantes(this.selectedCurso._id)
        .then(alum => {
            this.postulantes = alum;
            console.log('POST: ', this.postulantes);
        });
    }

    getDias() {
        this.dias.push({
        label: 'Dia',
        value: ''
        });
        for (let i = 0; i <= 31; i++) {
            this.dias.push({
                label: 0 + i,
                value: 0 + i
            });
        }
    }

    getMeses() {
        this.meses.push({
        label: 'Mes',
        value: ''
        });
            this.meses.push({
                label: 'Enero',
                value: ''
            });
            this.meses.push({
                label: 'Febrero',
                value: ''
            });
            this.meses.push({
                label: 'Marzo',
                value: ''
            });
            this.meses.push({
                label: 'Abril',
                value: ''
            });
            this.meses.push({
                label: 'Mayo',
                value: ''
            });
            this.meses.push({
                label: 'Junio',
                value: ''
            });
            this.meses.push({
                label: 'Julio',
                value: ''
            });
            this.meses.push({
                label: 'Agosto',
                value: ''
            });
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
        this.examenService.getCursos(this.selectedAnio)
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


    getProfesores() {
        this.examenService.getProfesores(this.selectedMateria._id)
        .then(profesores => {
            this.profesores = profesores;
            console.log('PROF: ', profesores);
        });
    }


    getMaterias() {
        this.examenService.getMaterias(this.selectedCurso.nivel._id)
        .then(materias => {
            this.materias = materias;
        });

    }

    getExamenes() {
        this.examenService.getExamenesIngreso(this.selectedAnio, this.selectedCurso.nivel._id)
        .then(exa => {
            this.examenesIngreso = exa;
        });
    }

    guardarExamen(f: NgForm) {
        if (!this.currentFechaInicio) {
            this.currentFechaInicio = new Date();
        }
        const postulantes = JSON.stringify(this.postulantes);
        console.log(postulantes);
        this.examenService.saverExamenIngreso(this.currentFechaInicio, this.selectedProfesor._id,
                                            this.selectedMateria._id, this.selectedCurso._id)
        .then(examenGuardado => {
            this.examenesIngreso.push(examenGuardado);
            f.resetForm();
            this.selectedProfesor = null;
            this.selectedMateria = null;
            this.fechaInicioGuardada = null;
            this.currentFechaInicio = new Date();
            swal({
                title: 'Examen Guardado',
                timer: 4000,
                type: 'success'
            });
        });
    }

    formatNombreProfesor(profe: Profesor) {
        if (profe) {
            return profe.nombre + ' ' + profe.apellido + ' (' + profe.legajo + ')';
        } else {
            return '';
        }
    }

    public getFechaInicio(): number {
        return this.dateFormatterService.getFormattedDate(this.currentFechaInicio);
    }

    addFechaInicio() {
        const date2 = new Date(this.currentFechaInicio.toString());
        this.fechaInicioGuardada = (date2.getDate()) + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
    }

    togglePost() {
        this.togglePostulantes = !this.togglePostulantes;
    }

    goBack() {
        this.location.back();
    }

    fechaExamenValida() {
        return this.currentFechaInicio.getFullYear() === this.selectedAnio;
    }
}
