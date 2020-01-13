import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  constructor(public fb: FormBuilder, public alert: AlertService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'userName': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'passwordConfirmation': new FormControl('', [Validators.required]),
    }, { validators: this.MatchPassword })
  }

  MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('passwordConfirmation').value;
    if (password != confirmPassword) {
      control.get('passwordConfirmation').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }

  submit() {
    let users = [];
    users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      const user = {
        'email': this.form.controls['userName'].value,
        'password': this.form.controls['password'].value,
      }
      users.push(user);
    } else {
       users = [{
        'email': this.form.controls['userName'].value,
        'password': this.form.controls['password'].value,
      }]
    }
    localStorage.setItem('users', JSON.stringify(users));
    this.alert.openSnackBar('User added', '')
  }


}
