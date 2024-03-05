import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuperAdminService } from '../../super-admin.service';
import{ SaService } from '../../sa.service';
import { EditAlarmsComponent } from './edit-alarms/edit-alarms.component';

export interface PeriodicElement {
  id :any;
  created_time :any;
  device_name :any;
  device_ip :any;
  type :any;
  severity :any;
  assignee :any;
  status :any;
  details :any;
}
const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit{
  
  displayedColumns: string[] = ['DeviceUID','TriggerValue','CompanyEmail','status','timestamp','company_name','DeviceName','type','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  constructor(public saService: SaService, private service: SuperAdminService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAlarms();
    this.saService.isPageLoading(true);
  }

  getAlarms(){
    this.service.getalarmsdata().then(data => {
      this.dataSource.data = data.logs;
      this.dataSource.paginator = this.paginator;
      this.saService.isPageLoading(false);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditAlarmsDialog(user: any): void {;
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = '300px';
     dialogConfig.height = 'auto';
     dialogConfig.maxWidth = '90vw';
     dialogConfig.data = { user }; 
     const dialogRef = this.dialog.open(EditAlarmsComponent, dialogConfig);
     dialogRef.afterClosed().subscribe(EditAlarmsComponent => {   
       this.getAlarms();
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
