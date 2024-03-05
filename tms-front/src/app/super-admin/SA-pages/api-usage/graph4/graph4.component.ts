import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph4',
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.css']
})
export class Graph4Component implements OnInit{
  constructor(public router:Router){};
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
  PressureData = [
    { x: new Date(2023, 7, 21), y: 20 },
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

  humidityData = [
    { x: new Date(2023, 7, 21), y: 30 },
    { x: new Date(2023, 7, 22), y: 92 },
    { x: new Date(2023, 7, 23), y: 40 },
    { x: new Date(2023, 7, 24), y: 84 },
    { x: new Date(2023, 7, 25), y: 32 },
    { x: new Date(2023, 7, 26), y: 30 },
    { x: new Date(2023, 7, 27), y: 84 },
    { x: new Date(2023, 7, 28), y: 12 },
    { x: new Date(2023, 7, 29), y: 10 },
    { x: new Date(2023, 7, 30), y: 94 },
    { x: new Date(2023, 7, 31), y: 94 },
    { x: new Date(2023, 8, 1), y: 22 },
    { x: new Date(2023, 8, 2), y: 22 },
    { x: new Date(2023, 8, 3), y: 22 },
    { x: new Date(2023, 8, 4), y: 22 },
    { x: new Date(2023, 8, 5), y: 22 },
    { x: new Date(2023, 8, 6), y: 22 },
    { x: new Date(2023, 8, 7), y: 22 },
    { x: new Date(2023, 8, 8), y: 22 },

  ];
   ngOnInit(): void {
    this.createChart(); 
   }
   createChart() {
    Highcharts.chart('newchart', {
        chart: {
            type: 'column',
            plotBorderColor: 'black',
            plotBorderWidth: 1,
            height: 550
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
            max: 100,
            gridLineWidth: 0
        },
        series: [{
            name: 'Temperature',
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, 'rgba(255, 0, 0, 1)'], // Start color (red)
                [1, 'rgba(255, 255, 0, 0.1)'] // End c
              ]
          },// Light purple color
            data: this.temperatureData // Data organized by day
        },  
        // {
        //     name: 'Humidity',
        //     color: 'rgba(130, 187, 255, 0.8)', // Light blue color
        //     data: this.humidityData // Data organized by day
        // }
      ] as any
    } as Highcharts.Options);
};
navigatetohome(){
  this.router.navigate(['sa/Api-Usage']);
}


}
