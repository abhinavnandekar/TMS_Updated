import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MailSendComponent } from './login-component/mail-send/mail-send.component';
import { RegVerifyComponent } from './login-component/reg-verify/reg-verify.component';
import { VerifyUserComponent } from './login-component/verify-user/verify-user.component';
import { SendVerifyComponent } from './login-component/send-verify/send-verify.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetPasswordComponent},
  { path: 'mail', component: MailSendComponent},
  { path: 'regVerify', component: RegVerifyComponent},
  { path: 'verify-user', component: VerifyUserComponent },
  { path: 'resend-verify', component: SendVerifyComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
