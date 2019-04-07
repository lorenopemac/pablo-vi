import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-notas',
    templateUrl: './notas.component.html',
    styleUrls: ['./notas.component.scss'],
    animations: [routerTransition()]
})
export class NotasComponent implements OnInit {

    constructor(
        public router: Router
    ) {}

    ngOnInit(): void {
    }

}
