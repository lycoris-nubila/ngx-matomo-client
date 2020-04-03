import {TestBed} from '@angular/core/testing';
import {NgxMatomoClientModule} from './ngx-matomo-client.module';

import {NgxMatomoClientService} from './ngx-matomo-client.service';

describe('NgxMatomoClient', () => {
    let service: NgxMatomoClientService;

    beforeAll(() => {
        TestBed.configureTestingModule({imports: [NgxMatomoClientModule.forRoot({baseUrl: 'https://analytics.spreeng.io/', id: 1})]});
        service = TestBed.inject(NgxMatomoClientService);
    });

    it('should insert script', () => {
        const script = document.getElementById('matomo');
        expect(script).toBeTruthy();
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    it('should send trackPageView', () => {
        service.trackPageView('Test');
    });
});
