import {Component} from '@angular/core';
import {CurlParserService} from "../../services/curl-parser/curl-parser.service";

@Component({
    selector: 'import-modal',
    templateUrl: './import-modal.component.html'
})
export class ImportModalComponent {
    curlCommand: string;

    constructor(private parser: CurlParserService) {
    }

    handleClick(): void {
        this.parser.parse(this.curlCommand);
    }
}