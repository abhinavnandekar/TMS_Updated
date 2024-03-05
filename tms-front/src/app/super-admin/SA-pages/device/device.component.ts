import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,} from '@angular/material/table';
import { AddDeviceComponent } from './add-device/add-device.component';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { SuperAdminService } from '../../super-admin.service';
import{ SaService } from '../../sa.service';


export interface PeriodicElement{
  DeviceUID:any;
  TriggerValue:any;
  CompanyEmail:any;
  ip_address:any;
  status:any;
  timestamp:any;
  company_name:any;
  company_location:any;
}
const Data: PeriodicElement[] = [
];
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],

})
export class DeviceComponent {
  showSearchInput: boolean = false;
  loading: boolean = true; 
  currentTime: Date = new Date();
  displayedColumns: string[] = ['EntryId','DeviceUID','DeviceLocation','DeviceName','CompanyEmail','CompanyName','IssueDate','status','SMS','email','type','endDate'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  private dataRefreshInterval: any; 


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public saService: SaService, private service :SuperAdminService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDeviceDetail();
    this.saService.isPageLoading(true);
  }
  
  getDeviceDetail(){
    this.service.getDeviceData().subscribe(
      (devices) =>{
        console.log(devices);
        this.dataSource.data = devices.logs;
        this.dataSource.paginator = this.paginator;
        this.saService.isPageLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


       openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px';
        dialogConfig.height = 'auto';
        dialogConfig.maxWidth = '90vw';
        const dialogRef = this.dialog.open(AddDeviceComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(deviceAdded => {});
      }

      refreshData() {
        this.getDeviceDetail();
      }
      toggleSearchInput() {
        this.showSearchInput = !this.showSearchInput;
      }
      hideSearchInput() {
        this.showSearchInput = false;
      }
      getStatusStyle(status: string): any {
        switch (status) {
          case 'heating':
            return { color: 'red' };
          case 'offline':
            return { color: 'blue' };
          case 'online':
            return { color: 'green' };
          default:
            return {}; // No additional styling for other statuses
        }
      }
 
 }


 
      
    

