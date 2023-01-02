import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AlertComponent } from '../alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private action: string | undefined = undefined;
  private durationInSeconds = 4;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  setAlert(message: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: { message, action: this.action },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
