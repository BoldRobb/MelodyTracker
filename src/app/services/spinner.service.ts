import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  show() {
    console.log('Spinner show triggered');  // Agregar log aquí
    this._loading.next(true);
  }

  hide() {
    console.log('Spinner hide triggered');  // Agregar log aquí
    this._loading.next(false);
  }
}
