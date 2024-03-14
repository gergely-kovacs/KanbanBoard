import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  snackBar = inject(MatSnackBar);

  showSuccessNotification(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  showErrorNotification(message: string) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
