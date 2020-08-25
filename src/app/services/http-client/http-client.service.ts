import {Injectable} from '@angular/core';
import {HttpRequest} from "../../models/http-request";
import {Subject} from "rxjs";
import {HttpResponse} from "../../models/http-response";
import {HttpResponseMapperService} from "../http-response-mapper/http-response-mapper.service";


const PENDING_RESPONSE = {status: 1, statusText: "", headers: []};

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    httpResponse: HttpResponse;
    httpResponseSubject: Subject<HttpResponse>;

    constructor(private mapper: HttpResponseMapperService) {
        this.httpResponseSubject = new Subject<HttpResponse>();
    }

    call(request: HttpRequest) {
        const nextHttpResponseSubject = (httpResponse: XMLHttpRequest) => this.httpResponseSubject.next(this.mapper.as(httpResponse));
        const pendingHttpResponseSubject = () => this.httpResponseSubject.next(PENDING_RESPONSE);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                nextHttpResponseSubject(this);
            } else if (this.readyState > 0) {
                pendingHttpResponseSubject();
            }
        };

        xhr.open(request.method, request.url, true);
        for (let header of request.headers) {
            if (header.key && header.value) {
                xhr.setRequestHeader(header.key, header.value);
            }
        }
        if (request.body) {
            xhr.send(request.body);
        } else {
            xhr.send();
        }
    }
}
