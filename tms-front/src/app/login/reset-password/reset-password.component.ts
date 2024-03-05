import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  token!: string;
  hidePassword = true;
  hideConfirmPassword = true;
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

 ngOnInit() {
  this.token = this.route.snapshot.queryParams['token']; // Access token from query parameters
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    return this.password.hasError('minlength')
      ? 'Password should be at least 8 characters long'
      : '';
  }
  getConfirmPasswordErrorMessage() {
    if (this.confirmpassword.hasError('required')) {
      return 'Confim Password is required';
    }
    return this.confirmpassword.hasError('minlength')
      ? 'Confim Password should be at least 8 characters long'
      : '';
  }

  submit(){
    if (this.token) {
      const resetData = { 
        token: this.token ,
        password: this.password.value
      };
      this.authService.resetPassword(resetData)
        .subscribe(
          () => {
            this.snackBar.open('Password Update Successfully!', 'Dismiss', {
                duration: 2000
              });
            this.redirectToLoginPage();
          },
          error => {
            this.snackBar.open(
              error.error.message || 'Failed to update password!',
              'Dismiss',
              { duration: 2000 }
            );
            this.redirectToLoginPage();
          }
        );
    } else {
      this.snackBar.open('Token not found', 'Dismiss', {
        duration: 2000
      });
      this.redirectToLoginPage();
    }
  }
    
  redirectToLoginPage() {
    setTimeout(() => {
      this.router.navigate(['/login/login']);
    }, 2000); // 4-second delay (4000 milliseconds)
  }
}
