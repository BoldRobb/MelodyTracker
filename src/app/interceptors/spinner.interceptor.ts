import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../services/others/spinner.service';
import { Observable, finalize, catchError, throwError } from 'rxjs';

// Esta es la nueva función de interceptor
export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const spinnerService = new SpinnerService(); // Si usas un servicio, asegúrate de que esté bien inyectado o disponible

  // Mostrar el spinner
  spinnerService.show();

  // Pasa la solicitud al siguiente interceptor o solicitud HTTP
  return next(req).pipe(
    finalize(() => {
      // Ocultar el spinner después de que se complete la solicitud
      spinnerService.hide();
    }),
    catchError((error) => {
      console.error('Petición Fallida: ', error.message);
      return throwError(error);
    })
  );
};
