import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RequestFormComponent} from './components/request-form/request-form.component';
import {HttpClientService} from "./services/http-client/http-client.service";
import {FormsModule} from "@angular/forms";
import {ResponseViewComponent} from './components/response-view/response-view.component';
import {JsonEditorComponent} from './components/json-editor/json-editor.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {HttpResponseMapperService} from "./services/http-response-mapper/http-response-mapper.service";
import {ImportModalComponent} from './components/import-modal/import-modal.component';
import {CurlParserService} from "./services/curl-parser/curl-parser.service";
import { CodeModalComponent } from './components/code-modal/code-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        RequestFormComponent,
        ResponseViewComponent,
        JsonEditorComponent,
        SpinnerComponent,
        ImportModalComponent,
        CodeModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        HttpClientService,
        HttpResponseMapperService,
        CurlParserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
