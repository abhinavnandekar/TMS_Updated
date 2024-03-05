import { Component } from '@angular/core';

@Component({
  selector: 'app-user-mobile',
  templateUrl: './user-mobile.component.html',
  styleUrls: ['./user-mobile.component.css']
})
export class UserMobileComponent {

  panelOpenState=false;

  data = [
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

}
