import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {HttpHeader} from "../../models/http-header";

import * as ace from 'ace-builds';
import {Ace} from 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';

@Component({
    selector: 'request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
    method: string;
    url: string;
    urlInputClass: string[];
    headers: HttpHeader[];

    jsonEditor: Ace.Editor;

    constructor(private client: HttpClientService) {
        this.method = "GET";
        this.url = "";
        this.headers = [{key: "Content-Type", value: "application/json"}];
        this.urlInputClass = ["form-control"];
    }

    ngOnInit(): void {
        this.jsonEditor = ace.edit("request-body-editor");
        this.jsonEditor.getSession().setMode("ace/mode/json");
    }

    handleUrlChange(): void {
        if (!this.url) {
            this.urlInputClass.push(" is-invalid");
        } else if (this.urlInputClass.length > 1) {
            this.urlInputClass.pop();
        }
    }

    addHeader(): void {
        this.headers.push({key: "", value: ""});
    }

    removeHeader(index: number): void {
        this.headers.splice(index, 1);
    }

    sendRequest(): void {
        if (!this.url) {
            this.handleUrlChange();
            return;
        }
        this.client.call({method: this.method, url: this.url, headers: this.headers, body: this.jsonEditor.getValue()});
    }
}
