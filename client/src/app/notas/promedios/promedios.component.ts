import {Component, Output, OnInit, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { Curso } from '../../escolar/curso/curso';
import { CursoService } from '../../escolar/curso/curso.service';
import { Alumno } from '../../personas/alumno/alumno';
import { AlumnoService } from '../../personas/alumno/alumno.service';
import { PromediosService } from './promedios.service';
@Component({
  selector: 'app-promedios',
  templateUrl: './promedios.component.html',
  styleUrls: ['./promedios.component.scss']
})
export class PromediosComponent implements OnInit {
  // Año
  anios = [];
  selectedAnio: number;

  // Cursos
  cursos: Curso[];
  selectedCurso: Curso;

  // Alumnos
  alumnos: Alumno[];

  selectedBoton: String;

  nivel: string;
  division: string;

  constructor(
    private promediosService: PromediosService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAnios();
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
    this.promediosService.getCursos(this.selectedAnio)
        .then(cursos => {
            this.cursos = cursos;
        });
}

  getAlumnos() {
    this.nivel = this.selectedCurso.nivel.nombre;
    this.division = this.selectedCurso.division;
    this.promediosService.getAlumnosAdmitidosCursos(this.selectedCurso._id)
    .then(alum => {
        console.log('ALUMNOS: ', alum);
        this.alumnos = alum;
    });
}
  goBack() {
    this.location.back();
  }
}
