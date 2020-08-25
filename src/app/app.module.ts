import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import {HttpClientService} from "./services/http-client.service";
import {FormsModule} from "@angular/forms";
import { ResponseViewComponent } from './components/response-view/response-view.component';
import { JsonEditorComponent } from './components/json-editor/json-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    ResponseViewComponent,
    JsonEditorComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [
      HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
