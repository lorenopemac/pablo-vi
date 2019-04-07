import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class DateFormatterService {
    constructor() {

   }


   public getFormattedDate(date: Date): number {
       return date && date.getTime() || new Date().getTime();

   }

   public dateToString(d: Date) {
       const date = new Date(d.toString());
       return (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

   }



}
