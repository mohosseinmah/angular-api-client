import {Component, OnDestroy} from '@angular/core';
import {HttpClientService} from "../../services/http-client/http-client.service";
import {HttpHeader} from "../../models/http-header";
import {CurlParserService} from "../../services/curl-parser/curl-parser.service";
import {Subscription} from "rxjs";
import {HttpMethod} from "../../models/http-method";


const EMPTY_STRING = "";

function getData(curlArgs: any) {
    for (let option in curlArgs) {
        if (curlArgs.hasOwnProperty(option) && option.startsWith("data")) {
            return curlArgs[option];
        }
    }
    return EMPTY_STRING;
}

@Component({
    selector: 'request-form',
    templateUrl: './request-form.component.html'
})
export class RequestFormComponent implements OnDestroy {
    method: HttpMethod;
    url: string;
    headers: HttpHeader[];
    body: string;

    urlInputClass: string[];
    private subscription: Subscription;

    constructor(private client: HttpClientService, private parser: CurlParserService) {
        this.method = HttpMethod.GET;
        this.url = EMPTY_STRING;
        this.urlInputClass = ["form-control"];
        this.headers = [];
        this.body = EMPTY_STRING;

        this.subscription = parser.curlArgsSubject.subscribe(curlArgs => this.handleCurlArgs(curlArgs));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private handleCurlArgs(curlArgs: any): void {
        this.method = curlArgs.request ? curlArgs.request : HttpMethod.GET;
        this.url = curlArgs._[1] ? curlArgs._[1] : EMPTY_STRING;
        this.headers = [];
        if (curlArgs.header) {
            if (typeof curlArgs.header === "string") {
                this.pushHeader(curlArgs.header);
            } else if (Array.isArray(curlArgs.header)) {
                curlArgs.header.forEach((header: string) => this.pushHeader(header));
            }
        }
        this.body = getData(curlArgs);
        this.handleUrlChange();
    }

    private pushHeader(headerKeyValue: string): void {
        const headerParts = headerKeyValue.split(":");
        this.headers.push({key: headerParts[0].trim(), value: headerParts[1].trim()});
    }

    handleUrlChange(): void {
        if (!this.url) {
            this.urlInputClass.push("is-invalid");
        } else if (this.urlInputClass.length > 1) {
            this.urlInputClass.pop();
        }
    }

    addHeader(): void {
        this.headers.push({key: EMPTY_STRING, value: EMPTY_STRING});
    }

    removeHeader(index: number): void {
        this.headers.splice(index, 1);
    }

    sendRequest(): void {
        if (!this.url) {
            this.handleUrlChange();
            return;
        }
        this.client.call({method: this.method, url: this.url, headers: this.headers, body: this.body});
    }
}
