import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(public fb: FormBuilder, public alert: AlertService, public router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      'userName': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }
  submit() {
    let users = [];
    users = JSON.parse(localStorage.getItem('users'));
    const email = this.form.controls['userName'].value;
    const password = this.form.controls['password'].value;
    const index = users.find(ele => {
      return ele.email === email
    })
    if (!index) {
      localStorage.setItem('isLoggedIn', 'false');
      this.alert.openSnackBar('User not found', '');
    } else if (index['password'] === password) {
      this.alert.openSnackBar('Login successfull', '');
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/employees'])
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      this.alert.openSnackBar('Wrong password', '');
    }

  }

}
