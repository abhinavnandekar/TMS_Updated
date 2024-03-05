import { Component, OnInit } from '@angular/core';
import { DashDataService } from '../../dash-data-service/dash-data.service';
import { AuthService } from '../../../login/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  UserEmail!: string | null;
  notifications: any[] = [];
  unreadCount!: any;

  constructor(
    private DashDataService: DashDataService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {}
 
  panelOpenState = false;


  ngOnInit(){
    this.userEmail();
  }

  userEmail(){
    const sessionUserId = sessionStorage.getItem('UserId');
    if(sessionUserId){
      this.DashDataService.userDetails(sessionUserId).subscribe(
        (userData) => {
          this.UserEmail = userData[0].PersonalEmail;
          this.userMessages();
        },
        (error) => {
          this.snackBar.open('Error While Fetching the UserEmail!', 'Dismiss', {
            duration: 2000
          });          
        }
      );
    }
  }

  userMessages(){
    if(this.UserEmail){
      this.DashDataService.userMessages(this.UserEmail).subscribe(
        (message) =>{
          this.notifications = message;
          this.unreadCount = this.notifications.filter(msg => !msg.isRead || msg.isRead.data[0] === 0).length;
        },
        (error) => {
          this.snackBar.open('Error While Fetching the User Messages!', 'Dismiss', {
            duration: 2000
          });
        }
      );
    }
  }

}

