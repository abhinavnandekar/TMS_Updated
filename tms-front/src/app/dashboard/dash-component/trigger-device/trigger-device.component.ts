import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashDataService } from '../../dash-data-service/dash-data.service';
import { AuthService } from '../../../login/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trigger-device',
  templateUrl: './trigger-device.component.html',
  styleUrls: ['./trigger-device.component.css']
})
export class TriggerDeviceComponent {
  device: any;
  deviceId!: string;
  CompanyEmail!:string | null;
  TriggerValue = new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/), Validators.min(0), Validators.max(200)]);

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
    public dialogRef: MatDialogRef<TriggerDeviceComponent>,
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
    this.CompanyEmail = this.authService.getCompanyEmail();
    if(this.TriggerValue.valid){
      const triggerData = {
        TriggerValue : this.TriggerValue.value,
        CompanyEmail : this.CompanyEmail
      }

      this.DashDataService.updateDeviceTrigger(this.deviceId, triggerData).subscribe(
      () => {
        this.snackBar.open('Trigger Updated successfully!', 'Dismiss', {
            duration: 2000
        });
        this.dialogRef.close();
      },
      (error)=>{
        this.snackBar.open('Failed to update trigger!', 'Dismiss', {
            duration: 2000
          });
      });
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
      return 'Not more than 200';
    }
    
    return '';
  }
}
