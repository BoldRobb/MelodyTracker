import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

// Importar los proveedores necesarios
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

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
    },
    provideAnimations(), // Proveedores requeridos para animaciones
    provideToastr({timeOut: 6000, positionClass: 'toast-top-left', preventDuplicates: true}) // Proveedores requeridos para Toastr
  ]
};
