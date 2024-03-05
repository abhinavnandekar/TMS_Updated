import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SuperAdminService } from '../../super-admin.service';
import { SaService } from '../../sa.service';

@Component({
  selector: 'app-api-usage',
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.css'],
})
export class ApiUsageComponent implements OnInit {
  progressValue = 40;
  bufferValue = 100;
  devicedata: any = {}; 
  temperatureData: any = {};
  displayGraphFull1: boolean = false;
  displayGraphFull2: boolean = false;
  displayGraphFull3: boolean = false;
  displayGraphFull4: boolean = false;
  transportcount: any;

  constructor(
    public saService: SaService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private service: SuperAdminService
  ) {}

  ngOnInit(): void {
    this.gettotaldevicecount();
    this.saService.isPageLoading(true);
    this.gettransportApiCount();

  }

  gettotaldevicecount() {
    this.service.gettransportGraphData().subscribe(
      (devices) => {
        this.saService.isPageLoading(false);
      },
      (error) => {
      }
    );
  }


  isFullScreen = false;

  fullScrrenGraph1(){
    this.displayGraphFull1 = !this.displayGraphFull1;
  }

  fullScrrenGraph2(){
    this.displayGraphFull2 = !this.displayGraphFull2;
  }

  fullScrrenGraph3(){
    this.displayGraphFull3 = !this.displayGraphFull3;
  }

  fullScrrenGraph4(){
    this.displayGraphFull4 = !this.displayGraphFull4;
  }
  gettransportApiCount(){
    this.service.gettransportApiCount().subscribe(
      (transportcount) =>{
      transportcount = this.transportcount;
       console.log(transportcount);
      },
      (error) => {
        console.log(error);
      }
    );
   }

}
