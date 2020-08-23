import {Injectable} from '@angular/core';
import {HttpRequest} from "../models/http-request";
import {Subject} from "rxjs";
import {HttpResponse} from "../models/http-response";

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    httpResponse: HttpResponse;
    httpResponseSubject: Subject<HttpResponse>;

    constructor() {
        this.httpResponseSubject = new Subject<HttpResponse>();
    }

    private map(httpResponse: XMLHttpRequest): HttpResponse {
        const response: HttpResponse = {
            status: httpResponse.status,
            statusText: httpResponse.statusText,
            headers: []
        };
        for (let responseHeader of httpResponse.getAllResponseHeaders().split("\r\n")) {
            response.headers.push(
                {
                    key: responseHeader.substring(0, responseHeader.indexOf(":")),
                    value: responseHeader.substring(responseHeader.indexOf(":") + 2)
                }
            );
        }
        if (httpResponse.responseText) {
            response.body = httpResponse.responseText;
        }
        return response;
    }

    call(request: HttpRequest) {
        const nextHttpResponseSubject = (httpResponse: XMLHttpRequest) => this.httpResponseSubject.next(this.map(httpResponse));

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                nextHttpResponseSubject(this);
            }
        };

        for (let header of request.headers) {
            xhr.setRequestHeader(header.key, header.value);
        }
        xhr.open(request.method, request.url, true);
        if (request.body) {
            xhr.send(request.body);
        } else {
            xhr.send();
        }
    }
}
