import { Component } from '@angular/core';
import { SuperAdminService } from 'src/app/super-admin/super-admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/login/auth/auth.service';
import {  MatDialogRef } from '@angular/material/dialog';
import { DeviceComponent } from '../device.component';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  deviceName: string = '';
  deviceLocation:string ='';
  deviceUid: string = '';
  TriggerValue:string = '';
   CompanyEmail:string = '';
   CompanyName:string = '';
   SMS:string = '';
  email:string = '';
  type:string = '';
 
  
  formData: any = {};

  constructor(private service: SuperAdminService, private snackBar: MatSnackBar,private AuthService:AuthService,
    public dialogRef: MatDialogRef<DeviceComponent>,
  ) {}

  onSubmit() {
  this.service.addDevice(this.formData).subscribe(response => {
    const message = 'API Response:' + JSON.stringify(response);
    this.snackBar.open(message, 'Close',{
      duration: 5000, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom', 
    });
  });
  }

  onSaveClick(): void {
    if(this.formData.valid){
      const deviceData = {
        DeviceUID: this.deviceUid,
        DeviceLocation: this.deviceLocation,
        DeviceName: this.deviceName,
        CompanyEmail: this.CompanyEmail,
        CompanyName: this.CompanyName,
        SMS: this.SMS,
        email:this.email,
        type:this.type,
      }
      const triggerData = {
        TriggerValue: this.TriggerValue,
        DeviceUID: this.deviceUid,
        CompanyEmail: this.CompanyEmail
      }
      this.service.addDevice(deviceData).subscribe(
        () =>{
         this.service.addDeviceTrigger(triggerData).subscribe(
           () => {
              this.snackBar.open('Device Added Successful!', 'Dismiss', {
                duration: 2000
              });
              this.dialogRef.close();
            },
            (error) => {
              this.snackBar.open(
                error.error.message || 'Failed to set Trigger. Please try again.',
                'Dismiss',
                { duration: 2000 }
              );
            }
        );
      },
      (error) => {
        this.snackBar.open(
            error.error.message || 'Failed to add Device. Please try again.',
            'Dismiss',
            { duration: 2000 }
          );
        this.dialogRef.close();
      });
    }
  }
}

