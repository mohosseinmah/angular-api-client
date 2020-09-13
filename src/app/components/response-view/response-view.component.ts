import {Component, OnDestroy} from '@angular/core';
import {HttpClientService} from "../../services/http-client/http-client.service";
import {Subscription} from "rxjs";
import {HttpResponse} from "../../models/http-response";

@Component({
    selector: 'response-view',
    templateUrl: './response-view.component.html',
    styleUrls: ['./response-view.component.css']
})
export class ResponseViewComponent implements OnDestroy {
    httpResponse: HttpResponse;
    private subscription: Subscription;

    constructor(httpClientService: HttpClientService) {
        this.httpResponse = httpClientService.httpResponse;
        this.subscription = httpClientService.httpResponseSubject.subscribe((httpResponse) => {
            this.httpResponse = httpResponse;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}