import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from '../../super-admin.service';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import{ SaService } from '../../sa.service';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
 id:any;
 created_time:any;
 message:any;
 status:any;
 timestamp:any;
 type:any;
}
const ELEMENT_DATA: PeriodicElement[] = [
];
export interface Template{
  create_time: any;
  type: any;
  subject:any;
  message:any;
}
const ELEMENT_DATA3 :Template[]=[
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},  
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},
  {create_time:'2023-08-29 11:53:32',type:'Affected user',subject:'	Platform users',message:'Rule chain/node lifecycle failure notification '},    
  ];
  export interface AllNotificationData{
    create_time: any;
    type: any;
    subject:any;
    message:any;
  
  }
  const ELEMENT_DATA2 :AllNotificationData[]=[
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},{create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},{create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    {create_time:'2023-08-29 11:53:32',type:'	Alarm',subject:'	New alarm `High Temperature`',message:'	Severity: critical, originator: Device`Sensor T1` '},
    ];

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  tick = false; 
  selectedReadStatus: number | null = null;

  displayedColumns: string[] = ['id','created_time', 'message','type','subject','recipient'];// ,'isRead'
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns2: string[] = ['check','create_time', 'type','subject','message','actions'];
  dataSource2!: MatTableDataSource<AllNotificationData>;

  displayedColumns3: string[] = ['check','create_time', 'type','subject','message','actions'];
  dataSource3!: MatTableDataSource<Template>;


  constructor(public saService: SaService, private service :SuperAdminService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.saService.isPageLoading(true);
    this.getNotification();
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;

    this.dataSource2 = new MatTableDataSource<AllNotificationData>(ELEMENT_DATA2);
    this.dataSource2.paginator = this.paginator;


    this.dataSource3 = new MatTableDataSource<Template>(ELEMENT_DATA3);
    this.dataSource3.paginator = this.paginator;
  }

  getNotification(){
    this.service.getNotification().then(data =>{
      console.log(data);
      this.dataSource.data = data.logs;
      this.dataSource.paginator = this.paginator;
      this.saService.isPageLoading(false);
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  




  bulk(event: any): void {
    this.tick = event.checked;
    this.dataSource.data.forEach((row: PeriodicElement) => {
   
    });
  }
 

  opensendDialog() {
    this.dialog.open(SendNotificationComponent, {
      width: '50%', // Set the width to 400px
    });
  }

  showSearchInput: boolean = false;
  hideSearchInput() {
    this.showSearchInput = false;
  }
  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
  }
}

