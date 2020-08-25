import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import {HttpClientService} from "./services/http-client/http-client.service";
import {FormsModule} from "@angular/forms";
import { ResponseViewComponent } from './components/response-view/response-view.component';
import { JsonEditorComponent } from './components/json-editor/json-editor.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {HttpResponseMapperService} from "./services/http-response-mapper/http-response-mapper.service";

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    ResponseViewComponent,
    JsonEditorComponent,
    SpinnerComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [
      HttpClientService,
      HttpResponseMapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
