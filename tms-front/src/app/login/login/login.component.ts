import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  errorMessage = '';
  loading: boolean = false;
  loadingMessage: string = "Sign In";
  UserId!: string;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    return this.password.hasError('minlength')
      ? 'Password should be at least 8 characters long'
      : '';
  }

  submit() {
    if (this.email.valid && this.password.valid) {
      this.loading = true;
      this.loadingMessage = "Signing in...";

      const loginData = {
        Username: this.email.value,
        Password: this.password.value
      };

      this.authService.login(loginData).subscribe(
        (response) => {
          const token = response.token;
          this.authService.setToken(token);
          const checkUserType = () => {
            const userType = this.authService.getUserType();
            if (userType) {
              this.UserId = sessionStorage.getItem('UserId') ?? '';
              this.authService.setUserOnline(this.UserId).subscribe(
                () =>{
                  this.redirectUser(userType);
                  this.snackBar.open('Login successful!', 'Dismiss', {
                    duration: 2000
                  });
                },
                (error) =>{
                }
              );
            } else {
              setTimeout(checkUserType, 100);
            }
          };
          checkUserType();
        },
        (error) => {
          this.snackBar.open(
            error.error.message || 'Login failed. Please try again.',
            'Dismiss',
            { duration: 2000 }
          );
          this.errorMessage = error.error.message || '';
          this.loading = false;
          this.loadingMessage = "Sign In";
        }
      );
    }
  }

  redirectUser(userType: string) {
    if (userType === 'Standard' || userType === 'Admin') {
      this.router.navigate(['/dash/temp']);
    } else if (userType === 'Super Admin') {
      this.router.navigate(['/sa/users']);
    }
  }
}
