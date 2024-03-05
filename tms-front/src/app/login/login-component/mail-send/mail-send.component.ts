import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { EncrptService } from '../../../services/encrpt.service';

@Component({
  selector: 'app-mail-send',
  templateUrl: './mail-send.component.html',
  styleUrls: ['./mail-send.component.css']
})
export class MailSendComponent implements OnInit {
  personalEmail!: string;
  counter = 10;
  showResendLink = false;
  linkClicked = false;
  interval: any; // Variable to store the interval

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private encrptService: EncrptService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encryptedEmail = params['personalEmail'];
      this.personalEmail = this.encrptService.decryptData(encryptedEmail);
    });
    this.startCounter();
  }

  resendResetPasswordEmail() {
    const resendforgotData = {
      personalEmail: this.personalEmail
    };

    if (!this.linkClicked) {
      this.linkClicked = true; // Set linkClicked to true before making the API call

      // Call the API to resend the verification email
      this.authService.resendForgot(resendforgotData).subscribe(
        (response) => {
          this.snackBar.open('Resend Successful!', 'Dismiss', {
            duration: 2000
          });
        },
        (error) => {
          this.snackBar.open('Token not found', 'Dismiss', {
            duration: 2000
          });
          // Handle error, if needed
        }
      );

      this.resetCounter();
    }
  }

  startCounter() {
    this.interval = setInterval(() => {
      this.counter--;
      if (this.counter <= 0) {
        clearInterval(this.interval);
        this.showResendLink = true;
      }
    }, 1000);
  }

  resetCounter() {
    clearInterval(this.interval);
    this.showResendLink = false;
    this.counter = 10;
    this.linkClicked = false; // Reset linkClicked to false
    this.startCounter();
  }
}
