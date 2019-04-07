import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-escolars',
    templateUrl: './escolar.component.html',
    styleUrls: ['./escolar.component.scss'],
    animations: [routerTransition()]
})
export class EscolarComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
