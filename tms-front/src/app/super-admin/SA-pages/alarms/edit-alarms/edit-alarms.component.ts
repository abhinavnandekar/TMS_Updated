import { Component, Inject } from '@angular/core';
import { SuperAdminService } from 'src/app/super-admin/super-admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-alarms',
  templateUrl: './edit-alarms.component.html',
  styleUrls: ['./edit-alarms.component.css'],
})
export class EditAlarmsComponent {
  user: any;
  AlarmForm: FormGroup;

  constructor(  private service: SuperAdminService, public dialogRef: MatDialogRef<EditAlarmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user }; 
    console.log(this.user);

    this.AlarmForm = new FormGroup({
      TriggerValue: new FormControl(this.user.TriggerValue, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.AlarmForm.valid) {
      const updatedTriggerValue = this.AlarmForm.value.TriggerValue;
      this.user.TriggerValue = updatedTriggerValue;
      this.service.updateDeviceTrigger(this.user.DeviceUID, this.user).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
}
