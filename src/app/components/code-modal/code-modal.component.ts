import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpMethod} from "../../models/http-method";
import {HttpHeader} from "../../models/http-header";


const COPY = "copy";

@Component({
    selector: 'code-modal',
    templateUrl: './code-modal.component.html'
})
export class CodeModalComponent {
    generatedCurl: string;
    @ViewChild("code") elementRef: ElementRef<HTMLTextAreaElement>;
    icon: string;

    @Input() method: HttpMethod;
    @Input() url: string;
    @Input() headers: HttpHeader[];
    @Input() body: string;

    constructor() {
        this.icon = COPY;
    }

    generateCurl(): void {
        this.generatedCurl = `curl --location --request ${this.method} '${this.url}'`;
        for (const header of this.headers) {
            this.generatedCurl += ` --header '${header.key}: ${header.value}'`;
        }
        if (this.body) {
            this.generatedCurl += ` --data-raw '${this.body}'`;
        }
    }

    copyCurl(): void {
        const textareaElement = this.elementRef.nativeElement;
        textareaElement.select();
        document.execCommand(COPY);
        textareaElement.blur();
        this.icon = "check text-success";
        setTimeout(() => {
            this.icon = COPY;
        }, 1000);
    }
}