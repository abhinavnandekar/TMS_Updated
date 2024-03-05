const bcrypt = require('bcrypt');
const db = require('../db');

function userDevices(req, res) {
  const companyEmail = req.params.companyEmail;
  const userCheckQuery = 'SELECT * FROM tms_users WHERE CompanyEmail = ?';

  db.query(userCheckQuery, [companyEmail], (error, userCheckResult) => {
    if (error) {
      console.error('Error during user check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (userCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      const devicesQuery = 'SELECT * from tms_devices WHERE CompanyEmail = ?';

      db.query(devicesQuery, [companyEmail], (error, devices) => {
        if (error) {
          console.error('Error fetching devices:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ devices });
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function editDevice(req, res) {
  const deviceId = req.params.deviceId;
  const { DeviceLocation, DeviceName}  = req.body; 
  const deviceCheckQuery = 'SELECT * FROM tms_devices WHERE DeviceUID = ?';

  db.query(deviceCheckQuery, [deviceId], (error, deivceCheckResult) => {
    if (error) {
      console.error('Error during device check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (deivceCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'Device not found!' });
      }

      const devicesQuery = 'Update tms_devices SET DeviceLocation = ?, DeviceName = ? WHERE DeviceUID = ?';

      db.query(devicesQuery, [DeviceLocation, DeviceName, deviceId], (error, devices) => {
        if (error) {
          console.error('Error fetching devices:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Device Updated SuccessFully' });
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function companyDetails(req, res) {
  const UserId = req.params.UserId;
  const { Designation, ContactNo, Location}  = req.body; 
  const userCheckQuery = 'SELECT * FROM tms_users WHERE UserId = ?';

  db.query(userCheckQuery, [UserId], (error, useridCheckResult) => {
    if (error) {
      console.error('Error during UserId check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (useridCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      const userQuery = 'Update tms_users SET Designation=?, ContactNo=?, Location=? WHERE UserId=?';

      db.query(userQuery, [Designation, ContactNo, Location, UserId],(error, details) => {
        if (error) {
          console.error('Error fetching company details:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Company details Updated SuccessFully' });
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function personalDetails(req, res) {
  const UserId = req.params.UserId;
  const {FirstName, LastName}  = req.body; 
  const userCheckQuery = 'SELECT * FROM tms_users WHERE UserId = ?';

  db.query(userCheckQuery, [UserId], (error, useridCheckResult) => {
    if (error) {
      console.error('Error during UserId check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (useridCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      const userdetailQuery = 'Update tms_users SET FirstName=?, LastName=? WHERE UserId=?';

      db.query(userdetailQuery, [FirstName, LastName, UserId],(error, details) => {
        if (error) {
          console.error('Error fetching devices:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Personal details Updated SuccessFully' });
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function updatePassword(req, res) {
  const UserId = req.params.UserId;
  const { Password } = req.body;

  // Check if the user exists in the database
  const userCheckQuery = 'SELECT * FROM tms_users WHERE UserId = ?';
  db.query(userCheckQuery, [UserId], (error, useridCheckResult) => {
    try {
      if (error) {
        console.error('Error during UserId check:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (useridCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      // Hash the new password
      const hashedPassword = bcrypt.hashSync(Password, 10);

      // Update the user's password in the database
      const updatePasswordQuery = 'UPDATE tms_users SET Password = ? WHERE UserId = ?';
      db.query(updatePasswordQuery, [hashedPassword, UserId], (error, result) => {
        if (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Password updated successfully' });
      });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function fetchDeviceTrigger(req, res){
 const deviceId = req.params.deviceId;
 const deviceTriggerQuery = 'select * from tms_trigger where DeviceUID = ?';
   try {
     db.query(deviceTriggerQuery, [deviceId], (error, devicetriggerkResult) => {
       if (error) {
         console.error('Error during device check:', error);
         return res.status(500).json({ message: 'Internal server error' });
       }

       res.status(200).json(devicetriggerkResult);
     });
   } catch (error) {
     console.error('Error in device check:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
}

function fetchAllDeviceTrigger(req, res){
  const CompanyEmail = req.params.CompanyEmail;
  const deviceTriggerQuery = 'select * from tms_trigger where CompanyEmail = ?';

    try {
      db.query(deviceTriggerQuery, [CompanyEmail], (error, triggers) => {
        if (error) {
          console.error('Error during device check:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({triggers});
      });
    } catch (error) {
      console.error('Error in device check:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

function editDeviceTrigger(req, res) {
  const deviceId = req.params.deviceId;
  const { TriggerValue, CompanyEmail } = req.body;
  const deviceCheckQuery = 'SELECT * FROM tms_trigger WHERE DeviceUID = ?';

  db.query(deviceCheckQuery, [deviceId], (error, deviceCheckResult) => {
    if (error) {
      console.error('Error during device check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (deviceCheckResult.length === 0) {
        const insertTriggerQuery = 'INSERT INTO tms_trigger (DeviceUID, TriggerValue, CompanyEmail) VALUES (?,?,?)';

        db.query(insertTriggerQuery, [deviceId, TriggerValue, CompanyEmail], (error, insertResult) => {
          if (error) {
            console.error('Error while inserting device:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          return res.json({ message: 'Device added successfully!' });
        });
      } else {
        const updateDeviceTriggerQuery = 'UPDATE tms_trigger SET TriggerValue = ?, CompanyEmail = ? WHERE DeviceUID = ?';

        db.query(updateDeviceTriggerQuery, [TriggerValue, CompanyEmail, deviceId], (error, updateResult) => {
          if (error) {
            console.error('Error updating device trigger:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          return res.json({ message: 'Device updated successfully' });
        });
      }
    } catch (error) {
      console.error('Error in device check:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function getDataByTimeInterval(req, res) {
  try {
    const deviceId = req.params.deviceId;
    const timeInterval = req.query.interval;
    if (!timeInterval) {
      return res.status(400).json({ message: 'Invalid time interval' });
    }

    let sql;
    switch (timeInterval) {
      case '1hour':
        sql = `
        SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / 60) * 60) AS bucket_start_time,
          ROUND(AVG(Temperature), 1) AS Temperature,
          ROUND(AVG(Humidity), 1) AS Humidity,
          ROUND(AVG(flowRate), 1) AS flowRate,
          ROUND(AVG(TemperatureR), 1) AS TemperatureR,
          ROUND(AVG(TemperatureB), 1) AS TemperatureB,
          ROUND(AVG(TemperatureY), 1) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time;`;
        break;

      case '12hour':
        sql = `
        SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / (2 * 60)) * (2 * 60)) AS bucket_start_time,
          ROUND(AVG(Temperature), 1) AS Temperature,
          ROUND(AVG(Humidity), 1) AS Humidity,
          ROUND(AVG(flowRate), 1) AS flowRate,
          ROUND(AVG(TemperatureR), 1) AS TemperatureR,
          ROUND(AVG(TemperatureB), 1) AS TemperatureB,
          ROUND(AVG(TemperatureY), 1) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), INTERVAL 12 HOUR)
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time;`;
        break;

      case '1day':
        sql = `
        SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / (2 * 60)) * (2 * 60)) AS bucket_start_time,
          ROUND(AVG(Temperature), 1) AS Temperature,
          ROUND(AVG(Humidity), 1) AS Humidity,
          ROUND(AVG(flowRate), 1) AS flowRate,
          ROUND(AVG(TemperatureR), 1) AS TemperatureR,
          ROUND(AVG(TemperatureB), 1) AS TemperatureB,
          ROUND(AVG(TemperatureY), 1) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), INTERVAL 1 DAY)
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time;`;
        break;

      case '7day':
        sql = `
        SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / (5 * 60)) * (5 * 60)) AS bucket_start_time,
          ROUND(AVG(Temperature), 1) AS Temperature,
          ROUND(AVG(Humidity), 1) AS Humidity,
          ROUND(AVG(flowRate), 1) AS flowRate,
          ROUND(AVG(TemperatureR), 1) AS TemperatureR,
          ROUND(AVG(TemperatureB), 1) AS TemperatureB,
          ROUND(AVG(TemperatureY), 1) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time;`;
        break;

      case '30day':
        sql = `
        SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / (30 * 60)) * (30 * 60)) AS bucket_start_time,
          ROUND(AVG(Temperature), 1) AS Temperature,
          ROUND(AVG(Humidity), 1) AS Humidity,
          ROUND(AVG(flowRate), 1) AS flowRate,
          ROUND(AVG(TemperatureR), 1) AS TemperatureR,
          ROUND(AVG(TemperatureB), 1) AS TemperatureB,
          ROUND(AVG(TemperatureY), 1) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time;`;
        break;

      default:
        return res.status(400).json({ message: 'Invalid time interval' });
    }

    db.query(sql, [deviceId], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json({ data: results });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


function getDataByTimeIntervalStatus(req, res) {
  const deviceId = req.params.deviceId;
  const timeInterval = req.query.interval;
  if (!timeInterval) {
    return res.status(400).json({ message: 'Invalid time interval' });
  }

  let duration;
  switch (timeInterval) {
    case '30sec':
      duration = 'INTERVAL 30 SECOND';
      break;
    case '1min':
      duration = 'INTERVAL 1 MINUTE';
      break;
    case '2min':
      duration = 'INTERVAL 2 MINUTE';
      break;
    case '5min':
      duration = 'INTERVAL 5 MINUTE';
      break;
    case '10min':
      duration = 'INTERVAL 10 MINUTE';
      break;
    case '30min':
      duration = 'INTERVAL 30 MINUTE';
      break;
    case '1hour':
      duration = 'INTERVAL 1 HOUR';
      break;
    case '2hour':
      duration = 'INTERVAL 2 HOUR';
      break;
    case '10hour':
      duration = 'INTERVAL 10 HOUR';
      break;
    case '12hour':
      duration = 'INTERVAL 12 HOUR';
      break;
    case '1day':
      duration = 'INTERVAL 1 DAY';
      break;
    case '7day':
      duration = 'INTERVAL 7 DAY';
      break;
    case '30day':
      duration = 'INTERVAL 30 DAY';
      break;
    default:
      return res.status(400).json({ message: 'Invalid time interval' });
  }

  const sql = `SELECT Status, COUNT(*) as count FROM tms_trigger_logs WHERE DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), ${duration}) GROUP BY Status`;
  db.query(sql, [deviceId], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      // Calculate total count
      const totalCount = results.reduce((total, entry) => total + entry.count, 0);

      // Calculate percentage for each status
      const dataWithPercentage = results.map((entry) => ({
        status: entry.Status,
        count: entry.count,
        percentage: (entry.count / totalCount) * 100
      }));

      res.json({ dataStatus: dataWithPercentage });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function avg_interval(req,res){
  const id = req.params.id;
  const timeInterval = req.params.interval;
  if (!timeInterval) {
    return res.status(400).json({ message: 'Invalid time interval' });
  }  
  let duration;
  switch (timeInterval) {

    case '1hour':
      duration = 'INTERVAL 1 HOUR';
      break;
    case '12hour':
      duration = 'INTERVAL 12 HOUR';
      break;
    case '24hour':
      duration = 'INTERVAL 24 HOUR';
      break;
    case '1day':
      duration = 'INTERVAL 1 DAY';
      break;
    case '7day':
      duration = 'INTERVAL 7 DAY';
      break;
    case '30day':
      duration = 'INTERVAL 30 DAY';
      break;
    default:
      res.status(400).json({ message: 'Invalid time interval' });
    }
    const fetchbucketavgquery = `SELECT
    CONCAT(SUBSTR(DATE_FORMAT(TimeStamp, '%y-%m-%d %H.%i'), 1, 13), '0.00') AS bucket_start,
    CONCAT(SUBSTR(DATE_FORMAT(TimeStamp, '%y-%m-%d %H.%i'), 1, 13), '9.59') AS bucket_end,
    COUNT(*) AS count_bucket,
    AVG(TemperatureR) as avg_temp_R,
    AVG(TemperatureY) as avg_temp_Y,
    AVG(TemperatureB) as avg_temp_B
  FROM
    actual_data
  WHERE
    DeviceUID=? AND TimeStamp >= DATE_SUB(NOW(), ${duration})
  GROUP BY
    bucket_start,bucket_end
  ORDER BY
    bucket_start`;    

  try{
      db.query(fetchbucketavgquery,[id],(fetchavgError,fetchavgResult) => {
          if(fetchavgError){
              return res.status(401).json({message:'Unable to fetch bucket',fetchavgError});
          }
          return res.status(200).json({fetchavgResult});
      })        
  }
  catch(error){
      return res.status(500).send('Internal Server Error');
  }
}

function getDataByCustomDate(req, res) {
  try {
    const deviceId = req.params.deviceId;
    const startDate = req.query.start;
    const endDate = req.query.end;

    // const endDate = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Invalid parameters' });
    }

    const sql = `SELECT
          DeviceUID,
          FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(TimeStamp) / (30 * 60)) * (30 * 60)) AS bucket_start_time,
          AVG(Temperature) AS Temperature,
          AVG(Humidity) AS Humidity,
          AVG(flowRate) AS flowRate,
          AVG(TemperatureR) AS TemperatureR,
          AVG(TemperatureB) AS TemperatureB,
          AVG(TemperatureY) AS TemperatureY
        FROM
          actual_data
        WHERE
          DeviceUID = ? AND TimeStamp >= ? AND TimeStamp <= ?
        GROUP BY
          DeviceUID,
          bucket_start_time
        ORDER BY
          DeviceUID,
          bucket_start_time`;
    const sql2 = `SELECT * FROM actual_data WHERE DeviceUID = ? AND TimeStamp >= ? AND TimeStamp <= ?`;
    db.query(sql, [deviceId, startDate + 'T00:00:00.000Z', endDate + 'T23:59:59.999Z'], (fetchError, results) => {
      if (fetchError) {
        // console.error('Error fetching data:', error);
        return res.status(401).json({ message: 'Error while fetching data',fetchError });
      }

      res.json({ data: results });
    });
  } catch (error) {
    // console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error',error });
  }
}

function getDataByCustomDateStatus(req, res) {
  try {
    const deviceId = req.params.deviceId;
    const startDate = req.query.start;
    const endDate = req.query.end;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Invalid parameters' });
    }

    const sql = `SELECT Status, COUNT(*) as count FROM tms_trigger_logs WHERE DeviceUID = ? AND TimeStamp >= ? AND TimeStamp <= ? GROUP BY Status`;
    db.query(sql, [deviceId, startDate + 'T00:00:00.000Z', endDate + 'T23:59:59.999Z'], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Calculate total count
      const totalCount = results.reduce((total, entry) => total + entry.count, 0);

      // Calculate percentage for each status
      const dataWithPercentage = results.map((entry) => ({
        status: entry.Status,
        count: entry.count,
        percentage: (entry.count / totalCount) * 100
      }));

      res.json({ dataStatus: dataWithPercentage });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getDeviceDetails(req, res) {
  try {
    const deviceId = req.params.deviceId;

    // Validate the deviceId parameter if necessary

    const deviceDetailsQuery = 'SELECT * FROM tms_devices WHERE DeviceUID = ?';
    db.query(deviceDetailsQuery, [deviceId], (error, deviceDetail) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (deviceDetail.length === 0) {
        // Handle the case when no device details are found
        return res.status(404).json({ message: 'Device details not found' });
      }

      res.status(200).json(deviceDetail);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getLiveStatusDetails(req, res) {
  try {
    const deviceId = req.params.deviceId;

    // Validate the deviceId parameter if necessary

    const liveStatusQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? ORDER BY TimeStamp DESC LIMIT 1';
    db.query(liveStatusQuery, [deviceId], (error, liveStatus) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (liveStatus.length === 0) {
        // Handle the case when no live status details are found
        return res.status(404).json({ message: 'Live status details not found' });
      }

      res.status(200).json(liveStatus);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getUserData(req, res) {
  try {
    const userId = req.params.userId;

    // Validate the deviceId parameter if necessary

    const userDetailsQuery = 'SELECT * FROM tms_users WHERE UserId = ?';
    db.query(userDetailsQuery, [userId], (error, userDetail) => {
      if (error) {
        console.error('Error fetching User:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (userDetail.length === 0) {
        // Handle the case when no device details are found
        return res.status(404).json({ message: 'User details not found' });
      }

      res.status(200).json(userDetail);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function insertNewMessage(req, res) {
  try {
    const { sender, receiver, message } = req.body;
    const timestamp = new Date().toISOString();
    const isRead = 0; // Assuming the initial value for isRead is 0 (false)

    const insertQuery = 'INSERT INTO tms_notifications (sender, receiver, message, timestamp, isRead) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [sender, receiver, message, timestamp, isRead], (error, result) => {
      if (error) {
        console.error('Error inserting new message:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const insertedMessage = {
        sender,
        receiver,
        message,
        timestamp,
        isRead
      };

      res.status(201).json({message : 'Message Send SuccessFully'});
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function markMessageAsRead(req, res) {
  try {
    const messageId = req.params.messageId;

    const updateQuery = 'UPDATE tms_notifications SET isRead = 1 WHERE msgid = ?';
    db.query(updateQuery, [messageId], (error, result) => {
      if (error) {
        console.error('Error updating message status:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json({ message: 'Message marked as read' });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function deleteMessage(req, res) {
  try {
    const messageId = req.params.messageId;

    const deleteQuery = 'DELETE FROM tms_notifications WHERE msgid = ?';
    db.query(deleteQuery, [messageId], (error, result) => {
      if (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json({ message: 'Message deleted' });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function countUnreadMessages(req, res) {
  try {
    const receiver = req.params.receiver;

    const countQuery = 'SELECT COUNT(*) AS unreadCount FROM tms_notifications WHERE receiver = ? AND isRead = 0';
    db.query(countQuery, [receiver], (error, result) => {
      if (error) {
        console.error('Error counting unread messages:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const unreadCount = result[0].unreadCount;

      res.status(200).json({ unreadCount });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getUserMessages(req, res) {
  try {
    const receiver = req.params.receiver;

    const messagesQuery = 'SELECT * FROM tms_notifications WHERE receiver = ? ORDER BY timestamp desc';
    db.query(messagesQuery, [receiver], (error, messages) => {
      if (error) {
        console.error('Error fetching user messages:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json(messages);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function fetchCompanyUser(req, res) {
  const CompanyEmail = req.params.CompanyEmail;
  try {
    const query = 'SELECT * FROM tms_users where CompanyEmail = ?';
    db.query(query, [CompanyEmail], (error, users) => {
      if (error) {
        throw new Error('Error fetching users');
      }

      res.status(200).json(users);
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function addDeviceTrigger(req, res) {
  const { DeviceUID, TriggerValue, CompanyEmail } = req.body;
    try {
        const insertTriggerQuery = 'INSERT INTO tms_trigger (DeviceUID, TriggerValue, CompanyEmail) VALUES (?,?,?)';

        db.query(insertTriggerQuery, [DeviceUID, TriggerValue, CompanyEmail], (error, insertResult) => {
          if (error) {
            console.error('Error while inserting device:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          return res.json({ message: 'Device Trigger added successfully!' });
        });

    } catch (error) {
      console.error('Error in device check:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

function addDevice(req, res) {
  const { DeviceUID, DeviceLocation, DeviceName, CompanyEmail, CompanyName, SMS, email, type, DeviceType } = req.body;

  try {
    const checkDeviceQuery = 'SELECT * FROM tms_devices WHERE DeviceUID = ?';
    const insertDeviceQuery = 'INSERT INTO tms_devices (DeviceUID, DeviceLocation, DeviceName, CompanyEmail, CompanyName, IssueDate, SMS, email, type, DeviceType, endDate) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 365 DAY))';

    db.query(checkDeviceQuery, [DeviceUID], (error, checkResult) => {
      if (error) {
        console.error('Error while checking device:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'Device already added' });
      }

      db.query(insertDeviceQuery, [DeviceUID, DeviceLocation, DeviceName, CompanyEmail, CompanyName, SMS, email, type, DeviceType], (insertError, insertResult) => {
        if (insertError) {
          console.error('Error while inserting device:', insertError);
          return res.status(500).json({ message: 'Internal server error' });
        }

        return res.json({ message: 'Device added successfully!' });
      });
    });
  } catch (error) {
    console.error('Error in device check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function barChartCustom(req, res) {
  const deviceId = req.params.deviceId;
  const startDate = req.query.start;
  const endDate = req.query.end;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Invalid parameters' });
  }


  // Fetch data for the given date range
  const queryRange = `
    SELECT DATE(TimeStamp) AS date,
           MAX(totalVolume) AS endVolume,
           MIN(totalVolume) AS startVolume
    FROM actual_data
    WHERE DeviceUID = ? AND TimeStamp BETWEEN ? AND ?
    GROUP BY DATE(TimeStamp)
    ORDER BY date ASC
  `;

  db.query(queryRange, [deviceId, startDate, endDate], (err, resultRange) => {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Calculate total consumption for each date
      const datewiseConsumption = resultRange.map((row) => ({
        date: row.date,
        totalConsumption: row.endVolume - row.startVolume,
      }));

      return res.json(datewiseConsumption);
    });
}

function getTotalVolumeForToday(req, res) {
  const { deviceId } = req.params;
  try {
    // Fetch the very first entry for today
    const fetchFirstEntryQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() ORDER BY EntryID ASC LIMIT 1';

    // Fetch the latest entry for today
    const fetchLatestEntryQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() ORDER BY EntryID DESC LIMIT 1';

    // Fetch the very first entry for yesterday
    const fetchFirstEntryYesterdayQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() - INTERVAL 1 DAY ORDER BY EntryID ASC LIMIT 1';

    // Fetch the latest entry for yesterday
    const fetchLatestEntryYesterdayQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() - INTERVAL 1 DAY ORDER BY EntryID DESC LIMIT 1';

    db.query(fetchFirstEntryQuery, [deviceId], (fetchFirstError, fetchFirstResult) => {
      if (fetchFirstError) {
        console.error('Error while fetching the first entry:', fetchFirstError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      db.query(fetchLatestEntryQuery, [deviceId], (fetchLatestError, fetchLatestResult) => {
        if (fetchLatestError) {
          console.error('Error while fetching the latest entry:', fetchLatestError);
          return res.status(500).json({ message: 'Internal server error' });
        }

        db.query(fetchFirstEntryYesterdayQuery, [deviceId], (fetchFirstYesterdayError, fetchFirstYesterdayResult) => {
          if (fetchFirstYesterdayError) {
            console.error('Error while fetching the first entry for yesterday:', fetchFirstYesterdayError);
            return res.status(500).json({ message: 'Internal server error' });
          }

          db.query(fetchLatestEntryYesterdayQuery, [deviceId], (fetchLatestYesterdayError, fetchLatestYesterdayResult) => {
            if (fetchLatestYesterdayError) {
              console.error('Error while fetching the latest entry for yesterday:', fetchLatestYesterdayError);
              return res.status(500).json({ message: 'Internal server error' });
            }

            const todayConsumption = fetchLatestResult[0].totalVolume - fetchFirstResult[0].totalVolume;
            const yesterdayConsumption = fetchLatestYesterdayResult[0].totalVolume - fetchFirstYesterdayResult[0].totalVolume;

            return res.json({ today: todayConsumption, yesterday: yesterdayConsumption });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// function getTotalVolumeForTodayEmail(req, res) {
//   const { CompanyEmail } = req.params;

//   try {
//     // Fetch devices for the given company email
//     const fetchDevicesQuery = 'SELECT * FROM tms_devices WHERE CompanyEmail = ? AND DeviceType = "ws"';
//     db.query(fetchDevicesQuery, [CompanyEmail], (fetchError, devices) => {
//       if (fetchError) {
//         console.error('Error while fetching devices:', fetchError);
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       // Array to store the consumption data for each device
//       const consumptionData = [];

//       // Iterate through each device
//       devices.forEach(device => {
//         const deviceId = device.DeviceUID;

//         try {
//           // Fetch the latest entry for the current day
//           const fetchCurrentDayEntryQuery = `
//             SELECT * FROM tms_Day_Consumption 
//             WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE()
//             ORDER BY TimeStamp DESC LIMIT 1
//           `;

//           db.query(fetchCurrentDayEntryQuery, [deviceId], (fetchCurrentDayError, fetchCurrentDayResult) => {
//             if (fetchCurrentDayError) {
//               console.error('Error while fetching current day entry:', fetchCurrentDayError);
//               return res.status(500).json({ message: 'Internal server error' });
//             }

//             const todayConsumption = fetchCurrentDayResult.length > 0 ? fetchCurrentDayResult[0].totalVolume : 0;

//             // Fetch the latest entry for the previous day
//             const fetchPreviousDayEntryQuery = `
//               SELECT * FROM tms_Day_Consumption 
//               WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() - INTERVAL 1 DAY
//               ORDER BY TimeStamp DESC LIMIT 1
//             `;

//             db.query(fetchPreviousDayEntryQuery, [deviceId], (fetchPreviousDayError, fetchPreviousDayResult) => {
//               if (fetchPreviousDayError) {
//                 console.error('Error while fetching previous day entry:', fetchPreviousDayError);
//                 return res.status(500).json({ message: 'Internal server error' });
//               }

//               const yesterdayConsumption = fetchPreviousDayResult.length > 0 ? fetchPreviousDayResult[0].totalVolume : 0;

//               consumptionData.push({
//                 [device.DeviceUID]: [
//                   { today: todayConsumption, yesterday: yesterdayConsumption }
//                 ]
//               });

//               // If all devices have been processed, send the response
//               if (consumptionData.length === devices.length) {
//                 return res.json(consumptionData);
//               }
//             });
//           });
//         } catch (error) {
//           console.error('Error in device retrieval:', error);
//           res.status(500).json({ message: 'Internal server error' });
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error in device retrieval:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

function getTotalVolumeForTodayEmail(req, res) {
  const { CompanyEmail } = req.params;

  try {
    // Fetch devices for the given company email
    const fetchDevicesQuery = 'SELECT * FROM tms_devices WHERE CompanyEmail = ? AND DeviceType = "ws"';
    db.query(fetchDevicesQuery, [CompanyEmail], (fetchError, devices) => {
      if (fetchError) {
        console.error('Error while fetching devices:', fetchError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Array to store promises for fetching consumption data
      const promises = [];

      // Iterate through each device
      devices.forEach(device => {
        const deviceId = device.DeviceUID;

        // Function to fetch the latest entry for a specific day
        const fetchDayEntry = (dayOffset) => {
          const fetchDayEntryQuery = `
            SELECT * FROM tms_Day_Consumption 
            WHERE DeviceUID = ? AND DATE(TimeStamp) = CURDATE() - INTERVAL ${dayOffset} DAY
            ORDER BY TimeStamp DESC LIMIT 1
          `;

          return new Promise((resolve, reject) => {
            db.query(fetchDayEntryQuery, [deviceId], (fetchError, fetchResult) => {
              if (fetchError) {
                console.error(`Error while fetching day entry for day ${dayOffset}:`, fetchError);
                reject(fetchError);
              } else {
                const dayConsumption = fetchResult.length > 0 ? fetchResult[0].totalVolume : 0;
                resolve(dayConsumption);
              }
            });
          });
        };

        // Fetch today's and yesterday's consumption concurrently
        const todayPromise = fetchDayEntry(0);
        const yesterdayPromise = fetchDayEntry(1);

        // Push promises into the array
        promises.push(
          Promise.all([todayPromise, yesterdayPromise])
            .then(([todayConsumption, yesterdayConsumption]) => ({
              [deviceId]: [{ today: todayConsumption, yesterday: yesterdayConsumption }],
            }))
        );
      });

      // Wait for all promises to resolve
      Promise.all(promises)
        .then((consumptionData) => {
          res.json(consumptionData);
        })
        .catch((error) => {
          console.error('Error in device retrieval:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


function getTotalVolumeForMonth(req, res) {
  const { deviceId } = req.params;
  try {
    // Fetch the very first entry for the current month
    const fetchFirstEntryCurrentMonthQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND YEAR(TimeStamp) = YEAR(CURDATE()) AND MONTH(TimeStamp) = MONTH(CURDATE()) ORDER BY EntryID ASC LIMIT 1';

    // Fetch the latest entry for the current month
    const fetchLatestEntryCurrentMonthQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND YEAR(TimeStamp) = YEAR(CURDATE()) AND MONTH(TimeStamp) = MONTH(CURDATE()) ORDER BY EntryID DESC LIMIT 1';

    // Fetch the very first entry for the previous month
    const fetchFirstEntryPreviousMonthQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND YEAR(TimeStamp) = YEAR(CURDATE()) AND MONTH(TimeStamp) = MONTH(CURDATE()) - 1 ORDER BY EntryID ASC LIMIT 1';

    // Fetch the latest entry for the previous month
    const fetchLatestEntryPreviousMonthQuery = 'SELECT * FROM actual_data WHERE DeviceUID = ? AND YEAR(TimeStamp) = YEAR(CURDATE()) AND MONTH(TimeStamp) = MONTH(CURDATE()) - 1 ORDER BY EntryID DESC LIMIT 1';

    const handleResult = (error, result) => {
      if (error) {
        console.error('Error while fetching data:', error);
        return 0; // Return 0 if an error occurs
      }
      return result.length > 0 ? result[0].totalVolume : 0; // Return the totalVolume if available, else return 0
    };

    db.query(fetchFirstEntryCurrentMonthQuery, [deviceId], (fetchFirstCurrentMonthError, fetchFirstCurrentMonthResult) => {
      db.query(fetchLatestEntryCurrentMonthQuery, [deviceId], (fetchLatestCurrentMonthError, fetchLatestCurrentMonthResult) => {
        db.query(fetchFirstEntryPreviousMonthQuery, [deviceId], (fetchFirstPreviousMonthError, fetchFirstPreviousMonthResult) => {
          db.query(fetchLatestEntryPreviousMonthQuery, [deviceId], (fetchLatestPreviousMonthError, fetchLatestPreviousMonthResult) => {
            const currentMonthConsumption = handleResult(fetchLatestCurrentMonthError, fetchLatestCurrentMonthResult) - handleResult(fetchFirstCurrentMonthError, fetchFirstCurrentMonthResult);
            const previousMonthConsumption = handleResult(fetchLatestPreviousMonthError, fetchLatestPreviousMonthResult) - handleResult(fetchFirstPreviousMonthError, fetchFirstPreviousMonthResult);

            return res.json({ currentMonth: currentMonthConsumption, previousMonth: previousMonthConsumption });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// function getTotalVolumeForMonthEmail(req, res) {
//   const { CompanyEmail } = req.params;

//   try {
//     // Fetch devices for the given company email
//     const fetchDevicesQuery = 'SELECT * FROM tms_devices WHERE CompanyEmail = ? AND DeviceType = "ws"';
//     db.query(fetchDevicesQuery, [CompanyEmail], (fetchError, devices) => {
//       if (fetchError) {
//         console.error('Error while fetching devices:', fetchError);
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       // Array to store the consumption data for each device
//       const consumptionData = [];

//       // Iterate through each device
//       devices.forEach(device => {
//         const deviceId = device.DeviceUID;

//         try {
//           // Fetch the sum of totalVolume for the current month
//           const fetchCurrentMonthTotalVolumeQuery = `
//             SELECT SUM(totalVolume) AS currentMonthTotalVolume
//             FROM tms_Day_Consumption 
//             WHERE DeviceUID = ? AND MONTH(TimeStamp) = MONTH(CURDATE())
//           `;

//           db.query(fetchCurrentMonthTotalVolumeQuery, [deviceId], (fetchCurrentMonthError, fetchCurrentMonthResult) => {
//             if (fetchCurrentMonthError) {
//               console.error('Error while fetching current month total volume:', fetchCurrentMonthError);
//               return res.status(500).json({ message: 'Internal server error' });
//             }

//             const currentMonthTotalVolume = fetchCurrentMonthResult[0].currentMonthTotalVolume || 0;

//             // Fetch the sum of totalVolume for the previous month
//             const fetchPreviousMonthTotalVolumeQuery = `
//               SELECT SUM(totalVolume) AS previousMonthTotalVolume
//               FROM tms_Day_Consumption 
//               WHERE DeviceUID = ? AND MONTH(TimeStamp) = MONTH(CURDATE() - INTERVAL 1 MONTH)
//             `;

//             db.query(fetchPreviousMonthTotalVolumeQuery, [deviceId], (fetchPreviousMonthError, fetchPreviousMonthResult) => {
//               if (fetchPreviousMonthError) {
//                 console.error('Error while fetching previous month total volume:', fetchPreviousMonthError);
//                 return res.status(500).json({ message: 'Internal server error' });
//               }

//               const previousMonthTotalVolume = fetchPreviousMonthResult[0].previousMonthTotalVolume || 0;

//               consumptionData.push({
//                 [device.DeviceUID]: [
//                   { thisMonth: currentMonthTotalVolume, lastMonth: previousMonthTotalVolume }
//                 ]
//               });

//               // If all devices have been processed, send the response
//               if (consumptionData.length === devices.length) {
//                 return res.json(consumptionData);
//               }
//             });
//           });
//         } catch (error) {
//           console.error('Error in device retrieval:', error);
//           res.status(500).json({ message: 'Internal server error' });
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error in device retrieval:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

function getTotalVolumeForMonthEmail(req, res) {
  const { CompanyEmail } = req.params;

  try {
    // Fetch devices for the given company email
    const fetchDevicesQuery = 'SELECT * FROM tms_devices WHERE CompanyEmail = ? AND DeviceType = "ws"';
    
    db.query(fetchDevicesQuery, [CompanyEmail], (fetchError, devices) => {
      if (fetchError) {
        console.error('Error while fetching devices:', fetchError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Array to store promises for fetching consumption data
      const promises = [];

      // Iterate through each device
      devices.forEach(device => {
        const deviceId = device.DeviceUID;

        // Function to fetch total volume for a specific month
        const fetchTotalVolumeForMonth = (monthOffset) => {
          const fetchTotalVolumeQuery = `
            SELECT SUM(totalVolume) AS totalVolume
            FROM tms_Day_Consumption 
            WHERE DeviceUID = ? AND MONTH(TimeStamp) = MONTH(CURDATE() - INTERVAL ${monthOffset} MONTH)
          `;

          return new Promise((resolve, reject) => {
            db.query(fetchTotalVolumeQuery, [deviceId], (fetchError, fetchResult) => {
              if (fetchError) {
                console.error(`Error while fetching total volume for month ${monthOffset}:`, fetchError);
                reject(fetchError);
              } else {
                const totalVolume = fetchResult[0].totalVolume || 0;
                resolve(totalVolume);
              }
            });
          });
        };

        // Fetch total volume for the current month and previous month concurrently
        const currentMonthPromise = fetchTotalVolumeForMonth(0);
        const previousMonthPromise = fetchTotalVolumeForMonth(1);

        // Push promises into the array
        promises.push(
          Promise.all([currentMonthPromise, previousMonthPromise])
            .then(([currentMonthTotalVolume, previousMonthTotalVolume]) => ({
              [deviceId]: [{ thisMonth: currentMonthTotalVolume, lastMonth: previousMonthTotalVolume }],
            }))
        );
      });

      // Wait for all promises to resolve
      Promise.all(promises)
        .then((consumptionData) => {
          res.json(consumptionData);
        })
        .catch((error) => {
          console.error('Error in device retrieval:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


function getTotalVolumeForDuration(req, res) {
  const { deviceId } = req.params;
  const { interval } = req.query;

  try {

    let duration2;
    let duration;
    switch (interval) {
      case '30sec':
        duration = 'INTERVAL 1 DAY';
        duration2 = '12:00:0000';
        break;
      case '1min':
        duration = 'INTERVAL 1 DAY';
        break;
      case '2min':
        duration = 'INTERVAL 1 DAY';
        break;
      case '5min':
        duration = 'INTERVAL 1 DAY';
        break;
      case '10min':
        duration = 'INTERVAL 1 DAY';
        break;
      case '30min':
        duration = 'INTERVAL 1 DAY';
        break;
      case '1hour':
        duration = 'INTERVAL 1 DAY';
        break;
      case '2hour':
        duration = 'INTERVAL 1 DAY';
        break;
      case '10hour':
        duration = 'INTERVAL 1 DAY';
        break;
      case '12hour':
        duration = 'INTERVAL 1 DAY';
        break;
      case '1day':
        duration = 'INTERVAL 1 DAY';
        break;
      case '7day':
        duration = 'INTERVAL 7 DAY';
        break;
      case '30day':
        duration = 'INTERVAL 30 DAY';
        break;
      default:
        return res.status(400).json({ message: 'Invalid time interval' });
    }

    const sql = `SELECT * FROM tms_Day_Consumption WHERE DeviceUID = ? AND TimeStamp >= DATE_SUB(NOW(), ${duration})`;
    db.query(sql, [deviceId], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json({ data: results });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getWaterConsumptionForDateRange(req, res) {
  const { deviceId, startDate, endDate } = req.params;

  try {
    // Fetch entries within the specified date range
    const fetchEntriesQuery = 'SELECT * FROM tms_Day_Consumption WHERE DeviceUID = ? AND DATE(TimeStamp) BETWEEN ? AND ? ORDER BY TimeStamp ASC';
      
    db.query(fetchEntriesQuery, [deviceId, startDate, endDate], (fetchError, fetchResult) => {
      if (fetchError) {
        console.error('Error while fetching entries:', fetchError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.json({ data:fetchResult });
    });
  } catch (error) {
    console.error('Error in device retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function deleteDevice(req, res) {
  try {
    const deviceUID = req.params.deviceUID;
    const deleteDeviceQuery = 'DELETE FROM tms_devices WHERE DeviceUID = ?';

    db.query(deleteDeviceQuery, [deviceUID], (error, result) => {
      if (error) {
        console.error('Error deleting device:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Device not found' });
      }

      res.json({ message: 'Device deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function editUser(req, res) {
  const userId = req.params.userId;
  const { FirstName, LastName, PersonalEmail, ContactNo, Location, Designation, UserType}  = req.body; 
  const UserCheckQuery = 'SELECT * FROM tms_users WHERE UserId = ?';

  db.query(UserCheckQuery, [userId], (error, UserCheckResult) => {
    if (error) {
      console.error('Error during device check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (UserCheckResult.length === 0) {
        console.log('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      const usersQuery = 'Update tms_users SET FirstName = ?, LastName = ?, PersonalEmail = ?, ContactNo = ?, Location = ?, Designation = ?, UserType = ? WHERE UserId = ?';

      db.query(usersQuery, [FirstName, LastName, PersonalEmail, ContactNo, Location, Designation, UserType, userId], (error, devices) => {
        if (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'User Updated SuccessFully' });
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

function fetchLatestEntry(req, res) {
  const { companyEmail } = req.params;
  const fetchUserDevicesQuery = `SELECT * FROM tms_devices WHERE CompanyEmail = ?`;
  const fetchLatestEntryQuery = `SELECT * FROM actual_data WHERE DeviceUID = ? ORDER BY EntryID DESC LIMIT 1`;
  const defaultEntry = {
    EntryID: 0,
    DeviceUID: null,
    Temperature: null,
    TemperatureR: null,
    TemperatureY: null,
    TemperatureB: null,
    Humidity: null,
    flowRate: null,
    totalVolume: null,
    TimeStamp: "0000-00-00T00:00:00.000Z",
    ip_address: "0.0.0.0",
    status: null
  };

  db.query(fetchUserDevicesQuery, [companyEmail], (fetchUserDevicesError, devices) => {
    if (fetchUserDevicesError) {
      return res.status(401).json({ message: 'Error while fetching devices' });
    }

    if (devices.length === 0) {
      return res.status(404).json({ message: 'No devices found for the user' });
    }

    const promises = devices.map(device => {
      return new Promise((resolve, reject) => {
        const deviceId = device.DeviceUID;
        db.query(fetchLatestEntryQuery, [deviceId], (fetchLatestEntryError, fetchLatestEntryResult) => {
          if (fetchLatestEntryError) {
            reject({ [deviceId]: { entry: [defaultEntry] } });
          } else {
            const deviceEntry = fetchLatestEntryResult.length === 0 ? [defaultEntry] : fetchLatestEntryResult;
            resolve({ [deviceId]: { entry: deviceEntry } });
          }
        });
      });
    });

    Promise.all(promises)
      .then(results => {
        res.json({ latestEntry: results });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error while fetching data for some devices', error });
      });
  });
}


function fetchDeviceTotal(req, res){
 const deviceId = req.params.deviceId;
 const deviceQuery = 'select * from tms_Day_Consumption where DeviceUID = ? AND (TimeStamp) = CURDATE()';
   try {
     db.query(deviceQuery, [deviceId], (error, deviceResult) => {
       if (error) {
         console.error('Error during device check:', error);
         return res.status(500).json({ message: 'Internal server error' });
       }

       res.status(200).json(deviceResult);
     });
   } catch (error) {
     console.error('Error in device check:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
}

function editDeviceFromSetting(req, res) {
  const deviceId = req.params.deviceId;
  const { DeviceLocation, DeviceName, DeviceTrigger, DeviceType } = req.body;
  const deviceCheckQuery = 'SELECT * FROM tms_devices WHERE DeviceUID = ?';

  db.query(deviceCheckQuery, [deviceId], (error, deviceCheckResult) => {
    if (error) {
      console.error('Error during device check:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (deviceCheckResult.length === 0) {
        console.log('Device not found!');
        return res.status(400).json({ message: 'Device not found!' });
      }

      const devicesQuery = 'UPDATE tms_devices SET DeviceLocation = ?, DeviceName = ?, DeviceType = ? WHERE DeviceUID = ?';
      const devicesTriggerQuery = 'UPDATE tms_trigger SET TriggerValue = ? WHERE DeviceUID = ?';

      db.query(devicesQuery, [DeviceLocation, DeviceName, DeviceType, deviceId], (error, devicesResult) => {
        if (error) {
          console.error('Error updating device:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        db.query(devicesTriggerQuery, [DeviceTrigger, deviceId], (error, triggerResult) => {
          if (error) {
            console.error('Error updating trigger:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          res.json({ message: 'Device Updated Successfully' });
        });
      });
    } catch (error) {
      console.error('Error updating device:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}



module.exports = {
  userDevices,
  editDevice,
  fetchDeviceTrigger,
  fetchAllDeviceTrigger,
  companyDetails,
  personalDetails,
  updatePassword,
  editDeviceTrigger,
  getDataByTimeInterval,
  getDataByCustomDate,
  getDataByTimeIntervalStatus,
  getDataByCustomDateStatus,
  getDeviceDetails,
  getLiveStatusDetails,
  getUserData,
  insertNewMessage,
  markMessageAsRead,
  deleteMessage,
  countUnreadMessages,
  getUserMessages,
  fetchCompanyUser,
  addDeviceTrigger,
  addDevice,
  barChartCustom,
  getTotalVolumeForToday,
  getTotalVolumeForMonth,
  getTotalVolumeForTodayEmail,
  getTotalVolumeForMonthEmail,
  getTotalVolumeForDuration,
  getWaterConsumptionForDateRange,
  deleteDevice,
  editUser,
  fetchLatestEntry,
  avg_interval,
  fetchDeviceTotal,
  editDeviceFromSetting
  
};