import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Employee } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
