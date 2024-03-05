import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashDataService } from '../../dash-data-service/dash-data.service';
import { AuthService } from '../../../login/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit{
  userId!: string | null;
  CompanyEmail! :string;
  CompanyName!:string;
  UserType!: string;
  ContactNo!: string;
  PersonalEmail!: string;
  

  errorMessage = '';
  TriggerValue = new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0), Validators.max(100)]);
  DeviceName = new FormControl('', [Validators.required]);
  DeviceUID = new FormControl('', [Validators.required]);
  DeviceLocation = new FormControl('', [Validators.required]);
  DeviceType = new FormControl('', [Validators.required]);
    

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustDialogWidth();
  }
  private adjustDialogWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      this.dialogRef.updateSize('90%', '');
    } else if (screenWidth <= 960) {
      this.dialogRef.updateSize('70%', '');
    } else {
      this.dialogRef.updateSize('400px', '');
    }
  }
  constructor(
    private DashDataService: DashDataService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }

  ngOnInit(){
    this.companyDetails();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if(this.DeviceName.valid && this.DeviceLocation.valid && this.DeviceUID.valid && this.TriggerValue.valid){
      const deviceData = {
        DeviceUID: this.DeviceUID.value,
        DeviceLocation: this.DeviceLocation.value,
        DeviceName: this.DeviceName.value,
        CompanyEmail: this.CompanyEmail,
        CompanyName: this.CompanyName,
        type : this.UserType,
        SMS:this.ContactNo,
        email:this.PersonalEmail,
        DeviceType: this.DeviceType.value
      }
      
      const triggerData = {
        DeviceUID: this.DeviceUID.value,
        TriggerValue: this.TriggerValue.value,
        CompanyEmail: this.CompanyEmail
      }


      this.DashDataService.addDevice(deviceData).subscribe(
        () =>{
          this.DashDataService.addDeviceTrigger(triggerData).subscribe(
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

  companyDetails(){
    this.userId = sessionStorage.getItem('UserId');
    if(this.userId){
      this.DashDataService.userDetails(this.userId).subscribe(
        (users) => {
          this.CompanyEmail = users[0].CompanyEmail;
          this.CompanyName = users[0].CompanyName;
          this.UserType = users[0].UserType;
          this.ContactNo = users[0].ContactNo;
          this.PersonalEmail = users[0].PersonalEmail;
        },
        (error) =>{
          this.snackBar.open(
            error.error.message || 'Error While Fetching the Compnay Details.',
            'Dismiss',
            { duration: 2000 }
          );
        }
      );
    }
  }

  getThresholdErrorMessage() {
    if (this.TriggerValue.hasError('required')) {
      return 'Threshold is required';
    }
    
    if (this.TriggerValue.hasError('pattern')) {
      return 'Not a valid number';
    }
    
    if (this.TriggerValue.hasError('min')) {
      return 'Not less than 0';
    }
    
    if (this.TriggerValue.hasError('max')) {
      return 'Not more than 100';
    }
    
    return '';
  }
}
