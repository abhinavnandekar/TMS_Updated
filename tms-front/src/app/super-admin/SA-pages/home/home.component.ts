import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from '../../super-admin.service';
import{ SaService } from '../../sa.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  Sno:any;
  name:any;
  Lastviewed:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Sno:'1',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'2',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'3',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'4',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'5',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'6',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'7',name:'vishal',Lastviewed:'6 min ago' },
  { Sno:'8',name:'vishal',Lastviewed:'6 min ago' },
];
export interface PeriodicElement2 {
  Device:any;
  value:any;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  { Device:'devices',value:'19/100' },
  { Device:'assets',value:'19/100' },
  { Device:'users',value:'19/100' },
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  navigatetodeviceComponent(){
    this.router.navigate(['sa/devices']);
  }
  navigatetoUserComponent(){
    this.router.navigate(['sa/users']);
  }

  selectedColor: string = 'white';

  changeCardColor(color: string): void {
    this.selectedColor = color;
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 

  displayedColumns: string[] = ['Sno','name','Lastviewed'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  totalUsers: number = 0;
  totalOnlineUsers: number = 0;
  totalOfflineUsers: number = 0;
  totalDevices: number = 0;
  totalActiveDevices: number = 0;
  totalInactiveDevices: number = 0;
  userData: any = {}; 
  devicedata:any = {};


  constructor(public router:Router,public saService: SaService, private service :SuperAdminService,public dialog: MatDialog) {}

  displayedColumns2: string[] = ['Device','value','dash_Progress'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
  ngOnInit(): void {
    //finctio to get user details
    this.getUsercount();
    this.gettotaldevicecount();
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.saService.isPageLoading(true);
  }
    temperatureData = [
      { x: new Date(2023, 7, 21), y: 50 },
      { x: new Date(2023, 7, 22), y: 82 },
      { x: new Date(2023, 7, 23), y: 10 },
      { x: new Date(2023, 7, 24), y: 74 },
      { x: new Date(2023, 7, 25), y: 22 },
      { x: new Date(2023, 7, 26), y: 10 },
      { x: new Date(2023, 7, 27), y: 74 },
      { x: new Date(2023, 7, 28), y: 22 },
      { x: new Date(2023, 7, 29), y: 10 },
      { x: new Date(2023, 7, 30), y: 74 },
      { x: new Date(2023, 8, 1), y: 22 },
    ]; 
   
   gettotaldevicecount(){
    this.service.getDevicecount().subscribe(
      (devices) =>{
        this.devicedata = devices.logs[0];
      },
      (error) => {
        console.log(error);
      }
    );
   }


    getUsercount(){
      this.service.getUSerInfo().then
      (data => {
        this.userData = data.logs[0];
        this.saService.isPageLoading(false);
      })
    }


}



