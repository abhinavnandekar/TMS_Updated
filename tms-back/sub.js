const mqtt = require('mqtt');
const mysql = require('mysql2');
const os = require('os');

// MQTT broker URL
//const broker = 'ws://dashboard.senselive.in:9001';
const broker = 'ws://65.2.127.156:9001';

// MySQL configuration
const mysqlConfig = {
        host: '13.200.38.129',
        user: 'mysql',
        password: 'sense!123',
        database: 'tms',
  port: 3306, // MySQL default port is 3306
};

// Create a MySQL connection pool
const mysqlPool = mysql.createPool(mysqlConfig);

// Fetch the local IP address
const localIpAddress = getLocalIpAddress();

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key];
    for (const item of iface) {
      if (item.family === 'IPv4' && !item.internal) {
        return item.address;
      }
    }
  }
  return 'Unknown'; // Return 'Unknown' if no IP address is found
}

console.log('Local IP Address:', localIpAddress);

const options = {
  username: 'Sense2023', // Replace with your MQTT broker username
  password: 'sense123', // Replace with your MQTT broker password
};
// Connect to the MQTT broker
const mqttClient = mqtt.connect(broker,options);

// Handle MQTT connection event
mqttClient.on('connect', () => {
  //console.log('Connected to MQTT broker');

  for (let i = 1; i <= 9; i++) {
    const deviceId = `SL0220230${i}`;
    const topic = `Sense/Live/${deviceId}`;
    mqttClient.subscribe(topic, (error) => {
      if (error) {
        console.error(`Error subscribing to ${topic}:`, error);
      } else {
       console.log(`Subscribed to ${topic}`);
      }
    });
  }

  for (let i = 10; i <= 62; i++) {
    const deviceId = `SL022023${i}`;
    const topic = `Sense/Live/${deviceId}`;
    mqttClient.subscribe(topic, (error) => {
      if (error) {
        console.error(`Error subscribing to ${topic}:`, error);
      } else {
       console.log(`Subscribed to ${topic}`);
      }
    });
  }
});

mqttClient.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message);
    //const date = new Date().toISOString();

    //console.log(data);
    const insertQuery = `
    INSERT INTO actual_data (DeviceUID, Temperature, Timestamp, TemperatureR, TemperatureY, TemperatureB, Humidity, flowRate, totalVolume, ip_address)
    VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertValues = [
      data.DeviceUID,
      data.Temperature,
      data.TemperatureR,
      data.TemperatureY,
      data.TemperatureB,
      data.Humidity,
      data.flowRate,
      data.totalVolume,
      localIpAddress,
    ];

    mysqlPool.query(insertQuery, insertValues, (error) => {
      if (error) {
        console.error('Error inserting data into MySQL:', error);
      } else {
      console.log('Data inserted into MySQL');
      }
    });
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

mqttClient.on('error', (error) => {
  console.error('MQTT error:', error);
});

process.on('exit', () => {
  mysqlPool.end();
});
