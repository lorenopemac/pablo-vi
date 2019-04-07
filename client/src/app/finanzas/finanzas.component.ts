import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-finanzas',
    templateUrl: './finanzas.component.html',
    styleUrls: ['./finanzas.component.scss'],
    animations: [routerTransition()]
})
export class FinanzasComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
