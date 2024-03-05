import { Component,Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashDataService } from '../../dash-data-service/dash-data.service';
import { AuthService } from '../../../login/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent {
  device: any;
  DeviceName = new FormControl('', [Validators.required]);
  DeviceLocation = new FormControl('', [Validators.required]);
  deviceId!: string; 

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
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.device = data.device;
  }

  ngOnInit() {
    this.adjustDialogWidth();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.deviceId = this.device.DeviceUID;
    if (this.DeviceLocation.valid && this.DeviceName.valid){
      const deviceData ={
      DeviceLocation : this.DeviceLocation.value,
      DeviceName : this.DeviceName.value
    }
      this.DashDataService.editDevice(this.deviceId, deviceData).subscribe(
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
} 