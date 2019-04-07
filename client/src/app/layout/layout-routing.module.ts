import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EscolarComponent } from '../escolar/escolar.component';
import { ExamenIngresoComponent } from '../escolar/examenIngreso/examenIngreso.component';
import { UsuarioComponent } from '../usuarios/usuarios.component';
import { CargarNotasCursoComponent } from '../notas/notasCurso/cargarNotasCurso.component';
import { DeactivateGuard } from '../notas/deactivateGuard/deactivate-guard';
import { CargarNotasIngresoComponent } from '../notas/notasIngreso/cargarNotasIngreso.component';
import { PromediosComponent } from '../notas/promedios/promedios.component';
import { NotasComponent } from '../notas/notas.component';
import { FinanzasComponent } from '../finanzas/finanzas.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // Rediccionamiento
            { path: '', redirectTo: '/usuarios', pathMatch: 'full' },

            // Ruta dirrecionando a un COMPONENTE
            { path: 'usuarios', component: UsuarioComponent },
            { path: 'escolar', component: EscolarComponent },
            { path: 'escolar/examenIngreso', component: ExamenIngresoComponent },
            { path: 'notas', component: NotasComponent },
            { path: 'finanzas', component: FinanzasComponent },
            { path: 'notas/cargarNotasCurso',  component: CargarNotasCursoComponent, canDeactivate: [DeactivateGuard] },
            { path: 'notas/cargarNotasIngreso',  component: CargarNotasIngresoComponent, canDeactivate: [DeactivateGuard]},
            { path: 'notas/promedios',  component: PromediosComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
