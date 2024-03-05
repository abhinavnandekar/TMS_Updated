import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashDataService } from '../../dash-data-service/dash-data.service';
import { AuthService } from '../../../login/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-device-from-setting',
  templateUrl: './edit-device-from-setting.component.html',
  styleUrls: ['./edit-device-from-setting.component.css']
})
export class EditDeviceFromSettingComponent {
  device: any = {};
  DeviceName = new FormControl('', [Validators.required]);
  DeviceLocation = new FormControl('', [Validators.required]);
  DeviceType = new FormControl('', [Validators.required]);
  TriggerValue = new FormControl('', [Validators.required]);
  deviceId!: any;

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
    public dialogRef: MatDialogRef<EditDeviceFromSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.device = data.device;
    if (this.device) {
      this.getDeviceTrigger(this.device.DeviceUID);
    }
  }

  getDeviceTrigger(deviceId:string) {
    if (deviceId) {
      this.DashDataService.fetchDeviceTrigger(deviceId).subscribe(
        (data: any) => {
          this.TriggerValue = new FormControl(`${data[0].TriggerValue}`);
        },
        (error) => {
          this.snackBar.open('Error while fetching device trigger!', 'Dismiss', {
            duration: 2000
          });
        });
    }
  }

  // ngOnInit() {
  //   this.DeviceUID.setValue(sessionStorage.getItem('DeviceUID'));
  //   console.log('DeviceUID:', this.DeviceUID.value);
  //   this.adjustDialogWidth();
  // }

  ngOnInit() {
    if (this.device) {
        this.DeviceName.setValue(this.device.DeviceName);
        this.DeviceLocation.setValue(this.device.DeviceLocation);
        this.DeviceType.setValue(this.device.DeviceType);
        this.TriggerValue.setValue(this.device.TriggerValue);
    }
    this.adjustDialogWidth();
  }  

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editDevice(): void {
    this.deviceId = this.device.DeviceUID;
    if (this.DeviceLocation.valid && this.DeviceName.valid && this.DeviceType.valid && this.TriggerValue.valid){
      const deviceData ={
      DeviceLocation : this.DeviceLocation.value,
      DeviceName : this.DeviceName.value,
      DeviceType : this.DeviceType.value,
      TriggerValue : this.TriggerValue.value,
    }
      this.DashDataService.editDeviceFromSetting(this.deviceId, deviceData).subscribe(
      () => {
        this.snackBar.open('Device Details Updated successfully!', 'Dismiss', {
            duration: 2000
        });
        this.dialogRef.close();
      },
      (error)=>{
        this.snackBar.open('Failed to update Device!', 'Dismiss', {
            duration: 2000
          });
      });
    }
  }

  getDevicenameError() {
    if (this.DeviceName.hasError('required')) {
      return 'Name is required';
    }
    return '';
  }

  getLocationError() {
    if (this.DeviceLocation.hasError('required')) {
      return 'Location is required';
    }

    return '';

  }

  // getThresholdErrorMessage() {

  //   if (this.TriggerValue.hasError('required')) {
  //     return 'Trigger Value is required';
  //   }

  //   return '';
  // }
} 