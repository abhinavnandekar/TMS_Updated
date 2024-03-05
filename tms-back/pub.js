const mqtt = require('mqtt');

// MQTT broker URL
// const brokerUrl = 'mqtt://65.2.127.156:1883';
const brokerOptions = {
  hostname: '65.2.127.156',
  port: 8884,         // Make sure to use the correct port for WSS
  protocol: 'wss',    // Use 'wss' for WebSocket Secure
  username: 'senselive',
  password: 'innovation',
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomData(deviceId) {
  const DeviceUID = deviceId;
  const Temperature = getRandomNumber(35, 50).toFixed(1);
  const Humidity = getRandomNumber(40, 70).toFixed(1);
  const TemperatureR= getRandomNumber(75, 77).toFixed(1);
  const TemperatureY= getRandomNumber(80, 82).toFixed(1);
  const TemperatureB = getRandomNumber(77, 79).toFixed(1);
  const Timestamp = new Date().toISOString();

  const data = {
    DeviceUID,
    Temperature,
    Humidity,
    TemperatureR,
    TemperatureY,
    TemperatureB,
    Timestamp
  };

  return JSON.stringify(data);
}

function generateRandomData2(deviceId) {
  const DeviceUID = deviceId;
  const Temperature = getRandomNumber(35, 50).toFixed(1);
  const Humidity = getRandomNumber(40, 70).toFixed(1);
  const TemperatureR= getRandomNumber(96, 98).toFixed(1);
  const TemperatureY= getRandomNumber(96, 98).toFixed(1);
  const TemperatureB = getRandomNumber(98, 100).toFixed(1);
  const Timestamp = new Date().toISOString();

  const data = {
    DeviceUID,
    Temperature,
    Humidity,
    TemperatureR,
    TemperatureY,
    TemperatureB,
    Timestamp
  };

  return JSON.stringify(data);
}

const client = mqtt.connect(brokerOptions);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  const deviceId = `SL123`;
    const topic = `sense/live/${deviceId}`;

    setInterval(() => {
      const message = generateRandomData(deviceId);
      client.publish(topic, message);
      console.log("publish for ", topic, message);
    }, 20000);

    // const deviceId2 = `SL02202353`;
    // const topic2 = `sense/live/${deviceId2}`;

    // setInterval(() => {
    //   const message2 = generateRandomData2(deviceId2);
    //   client.publish(topic2, message2);
    //   console.log("publish for ", topic2);
    // }, 20000);
  // for (let i = 52; i <= 53; i++) {
  //   const deviceId = `SL022023${i}`;
  //   const topic = `sense/live/${deviceId}`;

  //   setInterval(() => {
  //     const message = generateRandomData(deviceId);
  //     client.publish(topic, message);
  //     console.log("publish for ", topic);
  //   }, 20000);
  // }
});

client.on('error', (error) => {
  console.error('MQTT error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing MQTT connection.');
  client.end();
  process.exit();
});
