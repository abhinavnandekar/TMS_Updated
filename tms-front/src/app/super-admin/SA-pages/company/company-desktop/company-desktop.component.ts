import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { AddUsersComponent } from '../add-users/add-users.component';



@Component({
  selector: 'app-company-desktop',
  templateUrl: './company-desktop.component.html',
  styleUrls: ['./company-desktop.component.css']
})
export class CompanyDesktopComponent implements AfterViewInit {
  [x: string]: any;
  displayedColumns: string[] = ['dname',  'Cname', 'location', 'status','modification','edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog) {}
  openEditCompanyDialog() {
    const dialogRef = this.dialog.open(EditCompanyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDeleteCompanyDialog() {
    const dialogRef = this.dialog.open(DeleteCompanyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAddUSersDialog() {
    const dialogRef = this.dialog.open(AddUsersComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  }
  

  export interface PeriodicElement {
    uniqueid : string;
  dname: string;
  Cname: string;
  location: string;
  status: string;
  modification : string;
    
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On'  ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname : 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname:  'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On',modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname:'ABC  ', location: 'Nagpur', status: 'i' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: 'Nagpur', status: 'i' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: 'Nagpur', status: 'i' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: 'Nagpur', status: 'i' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: 'Nagpur', status: 'i' , modification :'21-08-23'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: '12:00', status: 'i' , modification :'yes'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: '12:00', status: 'i' , modification :'yes'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: '12:00', status: 'i' , modification :'yes'},
  { dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC', location: '12:00', status: 'i' , modification :'yes'},
  ];

