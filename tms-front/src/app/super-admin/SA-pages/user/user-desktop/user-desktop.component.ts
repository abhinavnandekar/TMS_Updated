import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddusersComponent } from '../addusers/addusers.component';
import { AddMultiusersComponent } from '../add-multiusers/add-multiusers.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { DeleteuserComponent } from '../deleteuser/deleteuser.component';

@Component({
  selector: 'app-user-desktop',
  templateUrl: './user-desktop.component.html',
  styleUrls: ['./user-desktop.component.css']
})
export class UserDesktopComponent {
  displayedColumns: string[] = ['check','avatar','userId','details','companyName','roles','Email','edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(public dialog: MatDialog) {}

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
 }
 openAdduserDialog(){
   const dialogRef = this.dialog.open(AddusersComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
 }
 openAddMultiuserDialog(){
     const dialogRef = this.dialog.open(AddMultiusersComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
 }
 openEdituserDialog(){
   const dialogRef = this.dialog.open(EdituserComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
 }
 openDeleteuserDialog(){
   const dialogRef = this.dialog.open(DeleteuserComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
 }
}

export interface PeriodicElement {
  userName: string;
  userId: number;
  details: string;
  companyName: string;
  Email: string;
  roles: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {userId: 2256, userName: 'Krishna', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 2547, userName: 'Vishal', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 3784, userName: 'Gaurav', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 4896, userName: 'Kaushal', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 5589, userName: 'Virat', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 2566, userName: 'Carbon', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 7588, userName: 'Nitrogen', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 7865, userName: 'Oxygen', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 7896, userName: 'Fluorine', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 10, userName: 'Neon', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 11, userName: 'Sodium', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 12, userName: 'Magnesium', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 13, userName: 'Aluminum', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 14, userName: 'Silicon', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 15, userName: 'Phosphorus', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 16, userName: 'Sulfur', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 17, userName: 'Chlorine', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 18, userName: 'Argon', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 19, userName: 'Potassium', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
  {userId: 20, userName: 'Calcium', details: 'xyz', companyName: '____',Email:'user@gmail.com',roles:'Manager'},
];

