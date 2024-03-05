import { Component, Inject, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/super-admin/super-admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  CompanyName!: string;
  Location!: string;
  Designation!: string;
  ContactNo!: string;
  UserId: any;
  company: any; 
  userForm: FormGroup;


  constructor(
    private service: SuperAdminService,
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.company = data.company; 
    this.UserId = this.company.UserId;

    // Initialize the form controls and validation rules
    this.userForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
      ContactNo: new FormControl('', [Validators.required]),
      Designation: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    // Populate the form with existing data if needed
    if (this.company) {
      this.userForm.patchValue({
        Username: this.company.Username,
        Location: this.company.Location,
        ContactNo: this.company.ContactNo,
        Designation: this.company.Designation,
      });
    }
  }



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
