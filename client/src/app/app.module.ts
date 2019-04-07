import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/primeng';
import { SharedModule, ButtonModule, PanelModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { RadioButtonModule } from 'primeng/primeng';

import { WINDOW_PROVIDERS } from './shared/WindowProvider/window.provider';
import { UrlService } from './shared/WindowProvider/window.provider.service';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        FormsModule,
        AccordionModule,
        ButtonModule,
        PanelModule,
        SharedModule,
        DataTableModule,
        TableModule,
        RadioButtonModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, WINDOW_PROVIDERS, UrlService],
    bootstrap: [AppComponent]
})
export class AppModule {}
