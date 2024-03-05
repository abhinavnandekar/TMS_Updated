import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashDataService {
  updateUser(arg0: string, updatedUser: { id: string; companyName: string; companyEmail: string; contact: string | null; location: string | null; firstName: string | null; lastName: string | null; personalEmail: string | null; designation: string | null; userType: string | null; }) {
    throw new Error('Method not implemented.');
  }
  // updateUser(userUpdate: { id: string; companyName: string; companyEmail: string; contact: string | null; location: string | null; firstName: string | null; lastName: string | null; personalEmail: string | null; designation: string | null; userType: string | null; }) {
  //   throw new Error('Method not implemented.');
  // }
  updateDevice(arg0: { id: any; name: string | null; location: string | null; dateOfIssue: string | null; status: string | null; deviceType: string | null; }) {
    throw new Error('Method not implemented.');
  }
 

  constructor(private http: HttpClient, private router: Router) {
  }

  setDeviceId(deviceID: string) {
    sessionStorage.setItem('filterDeviceID', deviceID);
  }

  getDeviceId(): string | null {
    return sessionStorage.getItem('filterDeviceID');
  }

  setDeviceName(deviceName: string) {
    sessionStorage.setItem('filterDeviceName', deviceName);
  }  

  getDeviceName(): string | null {
    return sessionStorage.getItem('filterDeviceName');
  }

  setDeviceType(deviceType: string) {
    console.log(deviceType);
    sessionStorage.setItem('filterDeviceType', deviceType);
  }

  getDeviceType(): string | null {
    return sessionStorage.getItem('filterDeviceType');
  }


  setInterval(interval: string) {
    sessionStorage.setItem('filterInterval', interval);
  }

  getInterval(): string | null {
    return sessionStorage.getItem('filterInterval');
  }

  setStartDate(StartDate: string) {
    sessionStorage.setItem('filterStartDate', StartDate);
  }

  getStartDate(): string | null {
    return sessionStorage.getItem('filterStartDate');
  }

  setEndDate(EndDate: string) {
    sessionStorage.setItem('FilterEndDate', EndDate);
  }

  getEndDate(): string | null {
    return sessionStorage.getItem('FilterEndDate');
  }

  //private readonly API_URL = 'https://ec2-13-200-38-129.ap-south-1.compute.amazonaws.com:3000';
   private readonly API_URL = 'http://localhost:3000';

  userDevices(CompanyEmail: string): Observable<any> {
    return this.http.get(`${this.API_URL}/userdevices/${CompanyEmail}`);
  }
  
  editDevice(deviceId: string, DeviceData:any):Observable<any> {
    return this.http.put(`${this.API_URL}/editDevice/${deviceId}`, DeviceData)
  }

  fetchTriggerAll(CompanyEmail: string):Observable<any> {
    return this.http.get(`${this.API_URL}/user-devices-trigger/${CompanyEmail}`);
  }
  

  updateDeviceTrigger(deviceId: string, triggerData:any): Observable<any> {
    return this.http.put(`${this.API_URL}/editDeviceTrigger/${deviceId}`, triggerData);
  }

  dataLast(deviceId:string, interval: any): Observable<any> {
    return this.http.get(`${this.API_URL}/data/${deviceId}/intervals?interval=${interval}`);
  }

  DataByCustomDate(deviceId: string, startDate: any, endDate: any): Observable<any> {
    const params = { start: startDate, end: endDate };
    return this.http.get(`${this.API_URL}/data/${deviceId}`, { params });
  }

  dataLastStatus(deviceId:string, interval: any): Observable<any> {
    return this.http.get(`${this.API_URL}/dataStatus/${deviceId}/intervals?interval=${interval}`);
  }

  DataByCustomDateStatus(deviceId: string, startDate: any, endDate: any): Observable<any> {
    const params = { start: startDate, end: endDate };
    return this.http.get(`${this.API_URL}/dataStatus/${deviceId}`, { params });
  }

  deviceStatus(deviceId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/live-device-status/${deviceId}`);
  }

  deviceTrigger(deviceId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/device-trigger/${deviceId}`);
  }

  userDetails(userId: string):Observable<any> {
    return this.http.get(`${this.API_URL}/user-data/${userId}`);
  }

  deviceDetails(deviceId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/live-device-detail/${deviceId}`);
  }

  userMessages(receiver: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${receiver}`);
  }

  updatePersonal(userId: string, PersonalData:any): Observable<any>{
    return this.http.put(`${this.API_URL}/personalDetails/${userId}`, PersonalData);
  }

  updateCompany(UserId: string, CompanyData:any): Observable<any>{
    return this.http.put(`${this.API_URL}/companyDetails/${UserId}`, CompanyData);
  }

  updatePassword(userId: string, Password:any): Observable<any>{
    return this.http.put(`${this.API_URL}/updatePassword/${userId}`, Password);
  }

  editUser(userId: string, userUpdate:any): Observable<any>{
    return this.http.put(`${this.API_URL}/edit-User/${userId}`, userUpdate);
  }

  companyUsers(CompanyEmail: string): Observable<any>{
    return this.http.get(`${this.API_URL}/Company-users/${CompanyEmail}`);
  }

  addDeviceTrigger(triggerData: any):Observable<any> {
    return this.http.post(`${this.API_URL}/addDeviceTrigger`, triggerData);
  }

  addDevice(deviceData: any):Observable<any> {
    return this.http.post(`${this.API_URL}/addDevice`, deviceData);
  }

  addUser(userRegister: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register-dashboard`, userRegister);
  }
  getDevicecount(): Observable<any> {
    return this.http.get(`${this.API_URL}/devInfo`);
  }

  deleteDevice(deviceid: string) {
    return this.http.delete(`${this.API_URL}/deleteDevice/${deviceid}`);
  }
    
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/removeUser/${userId}`);
  }

  getTodayConsumption(CompanyEmail: string): Observable<any> {
    return this.http.get(`${this.API_URL}/Total-Volume-Today-Email/${CompanyEmail}`);
  }

  getMonthConsumption(CompanyEmail: string): Observable<any> {
    return this.http.get(`${this.API_URL}/Total-Volume-Month-Email/${CompanyEmail}`);
  }
  
  getIntervalConsumption( deviceId : string, duration: any ): Observable <any>{
    return this.http.get(`${this.API_URL}/ConsuptionByIntervalBar/${deviceId}?interval=${duration}`);
  }

  getCustomConsumption(deviceId: string, startDate:any, endDate: any): Observable <any>{
    return this.http.get(`${this.API_URL}/ConsuptionByCustomBar/${deviceId}/${startDate}/${endDate}`);
  } 

  getTotalConsumpion(deviceId: string): Observable<any>{
    return this.http.get(`${this.API_URL}/FetchTodayConsumption/${deviceId}`);
  }

  getDeviceData(CompanyEmail: string): Observable <any> {
    return this.http.get(`${this.API_URL}/fetchLatestEntry/${CompanyEmail}`);
  }

  editDeviceFromSetting(deviceId: string, DeviceData:any):Observable<any> {
    return this.http.put(`${this.API_URL}/editDeviceFromSetting/${deviceId}`, DeviceData)
  }

  fetchDeviceTrigger(deviceId: string):Observable<any> {
    return this.http.get(`${this.API_URL}/device-trigger/${deviceId}`);
  }
}
