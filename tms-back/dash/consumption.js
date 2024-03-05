const cron = require('node-cron');
const mysql = require('mysql');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'senselivedb.cn5vfllmzwrp.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'sense!123',
  database: 'tmp',
});

// Schedule the script to run every minute
cron.schedule('*/1 * * * *', async () => {
  try {
    // Fetch all unique device IDs
    const fetchDeviceIdsQuery = 'SELECT DISTINCT DeviceUID FROM tms_devices where DeviceType = "ws" ';
    const deviceIds = await queryDatabase(fetchDeviceIdsQuery);

    // Iterate through each device ID
    for (const { DeviceUID } of deviceIds) {
      // Fetch the latest and first entries for today
      const fetchLatestEntryQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() ORDER BY EntryID DESC LIMIT 1';
      const fetchFirstEntryQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() ORDER BY EntryID ASC LIMIT 1';

      const latestResult = await queryDatabase(fetchLatestEntryQuery, [DeviceUID]);
      const firstResult = await queryDatabase(fetchFirstEntryQuery, [DeviceUID]);

      // Use the handleResult function to get the totalVolume
      const latestTotalVolume = handleResult(latestResult);
      const firstTotalVolume = handleResult(firstResult);

      // Calculate daily consumption
      const todayConsumption = latestTotalVolume - firstTotalVolume;

      // Insert or update daily consumption in the daily_consumption table
      const insertOrUpdateQuery = `
        INSERT INTO tms_Day_Consumption (DeviceUID, TimeStamp, totalVolume)
        VALUES (?, CURDATE(), ?)
        ON DUPLICATE KEY UPDATE totalVolume = ?;
      `;
      await queryDatabase(insertOrUpdateQuery, [DeviceUID, todayConsumption, todayConsumption]);

      console.log(`Daily consumption data for device ${DeviceUID} updated successfully.`);
    }
  } catch (error) {
    console.error('Error in the cron job:', error);
  }
});

// Function to query the database
function queryDatabase(sql, values = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to handle the result and extract totalVolume or return 0 in case of an error
const handleResult = (result) => {
  if (result.length > 0) {
    return result[0].totalVolume;
  } else {
    console.error('No data available for the specified device and date.');
    return 0;
  }
};
