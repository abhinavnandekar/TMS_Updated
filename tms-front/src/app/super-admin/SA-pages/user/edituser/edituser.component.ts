import { Component, Inject, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/super-admin/super-admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import the necessary form modules
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  UserId: any;
  user: any;

  userForm: FormGroup;

  constructor(
    private service: SuperAdminService,
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.UserId = this.user.UserId;

    // Initialize the form controls and validation rules
    this.userForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
      ContactNo: new FormControl('', [Validators.required]),
      Designation: new FormControl('', [Validators.required]),
      CompanyName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Populate the form with existing data if needed
    if (this.user) {
      this.userForm.patchValue({
        Username: this.user.Username,
        Location: this.user.Location,
        ContactNo: this.user.ContactNo,
        Designation: this.user.Designation,
        CompanyName:this.user.CompanyName
      });
    }
  }

  // Handle form submission
  updateCompanyDetails() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.UserId) {
        console.log(this.UserId);
        this.service.updateCompanyDetails(this.UserId, formData).subscribe(
          () => {
            this.dialogRef.close();
            console.log('Successfully Updated!', 'Dismiss');
            
          },
          (error) => {
            console.error('Error for getting details!', 'Dismiss');
          }
        );
      } else {
        console.log('UserId is not available!', 'Dismiss');
      }
    } else {
      console.log('Form is invalid!', 'Dismiss');
    }
  }
}

