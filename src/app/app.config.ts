import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([spinnerInterceptor]) // Usar la función de interceptor
    ),
    {
      provide: 'routerEventLogger',
      useFactory: () => {
        const router = inject(Router);
        router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            console.log('URL actual:', event.urlAfterRedirects);
          }
        });
      },
      deps: [Router]
    }
  ]
};
