import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, Sort } from '@angular/material'
import { Router } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public employeesData: Employee[];
  public displayedColumns: string[];
  public dataSource;
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {

  }
  sortData(sort: Sort) {
    const data = this.employeesData.slice();
    if (!sort.active || sort.direction === '') {
      this.employeesData = data;
      return;
    }

    this.employeesData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'phone': return this.compare(a.phone, b.phone, isAsc);
        case 'username': return this.compare(a.username, b.username, isAsc);
        case 'website': return this.compare(a.website, b.website, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.employeesData);

  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchData() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employeesData = data;
      this.displayedColumns = ['id', 'name', 'phone', 'username', 'website', 'email'];
      this.dataSource = new MatTableDataSource(this.employeesData);
    })
  }

  ngOnDestroy() {

  }

}
