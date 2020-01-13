import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Employee } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<any>(this.url)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }
}
