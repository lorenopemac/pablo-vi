import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

// Prime NG
import {AccordionModule} from 'primeng/primeng';
import { SharedModule, ButtonModule, PanelModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DatepickerModule } from '../datepicker/datepicker.module';

// COMPONENTS
import { UsuarioComponent } from '../usuarios/usuarios.component';
import { EscolarComponent } from '../escolar/escolar.component';
import { NotasComponent } from '../notas/notas.component';
import { CargarNotasCursoComponent } from '../notas/notasCurso/cargarNotasCurso.component';
import { CargarNotasIngresoComponent } from '../notas/notasIngreso/cargarNotasIngreso.component';
import { PromediosComponent } from '../notas/promedios/promedios.component';
import { ExamenIngresoComponent } from '../escolar/examenIngreso/examenIngreso.component';
import { FinanzasComponent } from '../finanzas/finanzas.component';

// SERVICES
import { DateFormatterService } from '../datepicker/dateFormatter.service';
import { AlumnoService } from '../personas/alumno/alumno.service';
import { CursoService } from '../escolar/curso/curso.service';
import { MateriaService } from '../escolar/materia/materia.service';
import { ProfesorService } from '../personas/profesor/profesor.service';
import { ExamenIngresoService } from '../escolar/examenIngreso/examenIngreso.service';
import { DeactivateGuard } from '../notas/deactivateGuard/deactivate-guard';
import { CargarNotasCursoService } from '../notas/notasCurso/cargarNotasCurso.service';
import { CargarNotasIngresoService } from '../notas/notasIngreso/cargarNotasIngreso.service';
import { PromediosService } from '../notas/promedios/promedios.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        AccordionModule,
        ButtonModule,
        PanelModule,
        SharedModule,
        DataTableModule,
        TableModule,
        FormsModule,
        DatepickerModule,
        InputTextModule,
        DropdownModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        UsuarioComponent,
        EscolarComponent,
        NotasComponent,
        CargarNotasIngresoComponent,
        CargarNotasCursoComponent,
        PromediosComponent,
        ExamenIngresoComponent,
        FinanzasComponent
    ],
    providers: [
        DateFormatterService,
        AlumnoService,
        CursoService,
        MateriaService,
        ProfesorService,
        ExamenIngresoService,
        CargarNotasCursoService,
        CargarNotasIngresoService,
        PromediosService,
        DeactivateGuard
    ]

})
export class LayoutModule {}
