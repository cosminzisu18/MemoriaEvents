import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isAuthorized: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toast: ToastService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe(
        (response) => {
          this.toast.success('Logged in successfully!');
          // console.log('Logged in successfully:', response);
          this.isAuthorized = true;
          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessage = 'Invalid username or password.';
         
        }
      );
    }
  };
}
