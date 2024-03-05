import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegVerifyComponent } from './login-component/reg-verify/reg-verify.component';
import { MailSendComponent } from './login-component/mail-send/mail-send.component';
import { VerifyUserComponent } from './login-component/verify-user/verify-user.component';
import { SendVerifyComponent } from './login-component/send-verify/send-verify.component';

import { LoginRoutingModule } from './login-routing.module';

import { MatCardModule } from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';

import{ AuthService } from '../login/auth/auth.service';
import { LoginLayoutComponent } from './login-layout/login-layout.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetPasswordComponent,
    RegVerifyComponent,
    MailSendComponent,
    VerifyUserComponent,
    SendVerifyComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
