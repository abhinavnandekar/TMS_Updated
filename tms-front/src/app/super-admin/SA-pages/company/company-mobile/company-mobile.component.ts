import { Component } from '@angular/core';

@Component({
  selector: 'app-company-mobile',
  templateUrl: './company-mobile.component.html',
  styleUrls: ['./company-mobile.component.css']
})
export class CompanyMobileComponent {

  panelOpenState=false;

  data = [
    {dname: 'xyz', uniqueid: 'VDYU673572', Cname: 'ABC  ', location: 'Nagpur', status: 'On' ,modification : '21-08-23'},
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
}
