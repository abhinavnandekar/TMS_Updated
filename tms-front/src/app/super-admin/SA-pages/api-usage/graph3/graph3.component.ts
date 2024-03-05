import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { SuperAdminService } from 'src/app/super-admin/super-admin.service';

@Component({
  selector: 'app-graph3',
  templateUrl: './graph3.component.html',
  styleUrls: ['./graph3.component.css']
})
export class Graph3Component  implements OnInit 
{

  constructor(public router:Router,private service:SuperAdminService ){};
  temperatureData = []; 

  ngOnInit(): void {
    this.service.gettransportGraph3Data().subscribe((data: any) => {
      this.temperatureData = data.data.map((entry: any) => ({
        x: new Date(entry.timestamp).getTime(), 
        y: entry.request_count
      }));
      this.javascript(); 
    });
  }

  javascript() {
    Highcharts.chart('javascript', {
        chart: {
            type: 'spline',
            plotBorderColor: 'black',
            plotBorderWidth: 1
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: ''
            },
            type: 'datetime', // Use datetime x-axis
            timezoneOffset: 330
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            gridLineWidth: 0
        },
        series: [{
            name: 'Temperature',
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, 'rgba(255, 0, 0, 1)'], // Start color (red)
                [1, 'rgba(130, 187, 255, 0.8)'] // End c
              ]
          },// Light purple color
            data: this.temperatureData // Data organized by day
        },  
       
      ] as any
    } as Highcharts.Options);
}

navigatetohome(){
  this.router.navigate(['sa/Api-Usage']);
}

}
