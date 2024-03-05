import { Injectable } from '@angular/core';
import * as mqtt from 'mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private client: mqtt.Client;

  constructor() {
    // Replace the following options with your MQTT broker details
    const options: mqtt.IClientOptions = {
      host: '13.232.24.140',
      port: 1883,
      protocol: 'mqtt',
      username: 'Sense2023',
      password: 'sense123'
    };

    this.client = mqtt.connect(options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      // You can subscribe to topics or perform other actions here
    });

    this.client.on('error', (error) => {
      console.error('Error connecting to MQTT broker:', error);
    });
  }

  // Add your MQTT-related methods here

  ngOnDestroy() {
    // Disconnect from the MQTT broker when the component or service is destroyed
    this.client.end();
  }
}
