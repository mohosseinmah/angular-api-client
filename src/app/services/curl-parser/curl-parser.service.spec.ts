import {TestBed} from '@angular/core/testing';

import {CurlParserService} from './curl-parser.service';

describe('CurlParserService', () => {
    let service: CurlParserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurlParserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
