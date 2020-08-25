import {Injectable} from '@angular/core';
import {HttpResponse} from "../../models/http-response";

@Injectable({
    providedIn: 'root'
})
export class HttpResponseMapperService {

    constructor() {
    }

    as(xmlHttpRequest: XMLHttpRequest): HttpResponse {
        const response: HttpResponse = {
            status: xmlHttpRequest.status,
            statusText: xmlHttpRequest.statusText,
            headers: []
        };
        for (let responseHeader of xmlHttpRequest.getAllResponseHeaders().split("\r\n")) {
            response.headers.push(
                {
                    key: responseHeader.substring(0, responseHeader.indexOf(":")),
                    value: responseHeader.substring(responseHeader.indexOf(":") + 2)
                }
            );
        }
        if (xmlHttpRequest.responseText) {
            response.body = xmlHttpRequest.responseText;
        }
        return response;
    }
}
