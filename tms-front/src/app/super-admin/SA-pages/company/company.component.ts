import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from '../../super-admin.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import{ SaService } from '../../sa.service';


export interface PeriodicElement {
  id:any;
  company_name:any;
  total_users:any;
  active_users:any;
  inactive_users:any;
  created_at:any;
  updated_at:any;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})

export class CompanyComponent implements OnInit{
  
  showSearchInput: boolean = false;
  displayedColumns: string[] = ['id','company_name','total_users','active_users','inactive_users','created_at','updated_at'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public saService: SaService, private service: SuperAdminService,public dialog: MatDialog) {}

  ngOnInit(): void {
     this.getcompanydetails();
     this.saService.isPageLoading(true);
  }
  getcompanydetails(){
    this.service.getCompanyInfo().then(data => {
      this.dataSource.data = data.logs;
      this.dataSource.paginator = this.paginator;
      this.saService.isPageLoading(false);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openEditCompanyDialog(company: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
    dialogConfig.maxWidth = '90vw';
    dialogConfig.data = { company }; // Make sure `company` contains the data you expect
    const dialogRef = this.dialog.open(EditCompanyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(deviceAdded => {});
  }

  hideSearchInput() {
    this.showSearchInput = false;
  }
  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
  }
  
}
