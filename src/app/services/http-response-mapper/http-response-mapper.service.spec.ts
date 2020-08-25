import {TestBed} from '@angular/core/testing';

import {HttpResponseMapperService} from './http-response-mapper.service';

describe('HttpResponseMapperService', () => {
    let service: HttpResponseMapperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpResponseMapperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
