import {isPlatformBrowser} from '@angular/common';
import {Inject, ModuleWithProviders, NgModule, Optional, PLATFORM_ID} from '@angular/core';
import {MatomoClientConfig} from './ngx-matomo-client.models';
import {NgxMatomoClientService} from './ngx-matomo-client.service';

@NgModule()
export class NgxMatomoClientModule {
    static forRoot(config: MatomoClientConfig): ModuleWithProviders {
        return {
            ngModule: NgxMatomoClientModule, providers: [NgxMatomoClientService, {provide: MatomoClientConfig, useValue: config}],
        };
    }

    constructor(@Inject(PLATFORM_ID) private platformId, config: MatomoClientConfig) {
        if (!isPlatformBrowser(this.platformId)) {
            throw new Error('Matomo client can\'t be used on server platform');
        }

        const w = (window as any);
        w._paq  = (window as any)._paq || [];

        if (config.cookieDomain) {
            w._paq.push(['setCookieDomain', config.cookieDomain]);
        }

        if (config.enableHeartBeatTimer) {
            w._paq.push(['enableHeartBeatTimer', 10]);
        }

        if (config.enableLinkTracking) {
            w._paq.push(['enableLinkTracking']);
        }

        if (config.initTrackPageView) {
            w._paq.push(['trackPageView']);
        }

        w._paq.push(['setTrackerUrl', config.baseUrl + (config.endpointFile ? config.endpointFile : 'piwik.php')]);
        w._paq.push(['setSiteId', config.id.toString()]);

        (() => {
            const d = document;
            const g = d.createElement('script');
            const s = d.getElementsByTagName('script')[0];
            g.id    = 'matomo';
            g.type  = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src   = config.baseUrl + (config.scriptFile ? config.scriptFile : 'piwik.js');
            s.parentNode.insertBefore(g, s);
        })();
    }
}
