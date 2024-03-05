import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent {
  deviceName: string = '';
  deviceIP: string = '';
  label: string = '';
  textarea: string = '';

  name = new FormControl('', [Validators.required]);
}
