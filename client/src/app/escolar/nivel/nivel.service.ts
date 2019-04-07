import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../../shared/WindowProvider/window.provider.service';

@Injectable()
export class NivelService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private nivelURL = this.urlService.getRestApiUrl() + '/nivel';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {

    }

}
