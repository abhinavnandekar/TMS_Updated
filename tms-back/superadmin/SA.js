// const bcrypt = require('bcrypt');
const db = require('../db');
// const jwtUtils = require('../token/jwtUtils');
// const CircularJSON = require('circular-json');
const secure = require('../token/secure');
// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const path = require('path');
// const ejs = require('ejs');

function fetchAllUsers(req, res) {
    try {
      const query = 'SELECT * FROM tms_users';
      db.query(query, (error, rows) => {
        if (error) {
          throw new Error('Error fetching users');
        }
        const encryptedUsers = secure.encryptData(rows, encryptKey);
  
        res.json({ users: rows });
        /*res.json({ users: encryptedUsers });*/
        console.log(rows);
        console.log(encryptedUsers)
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  function fetchAllDevices(req, res) {
    try {
      const query = 'SELECT * FROM tms_devices';
      db.query(query, (error, rows) => {
        if (error) {
          throw new Error('Error fetching devices');
        }
        res.json({ devices: rows });
        console.log(rows);
      });
    } catch (error) {
      console.error('Error fetching Devices:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

function userByCompanyname(req, res) {
    try {
      const company_name = req.params.company_name;
      const getDeviceByIdQuery = 'SELECT FirstName,LastName,CompanyName,CompanyEmail,ContactNo,Location,UserType,PersonalEmail FROM tms_users WHERE CompanyName = ?';
  
      db.query(getDeviceByIdQuery, [company_name], (error, result) => {
        if (error) {
          console.error('Error fetching device:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json(result);
      });
    } catch (error) {
      console.error('Error fetching device:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  //DEVICES
  

  function getDeviceByUID(req, res) {
    try {
      const deviceUID = req.params.deviceUID;
      const getDeviceByIdQuery = 'SELECT * FROM tms_devices WHERE DeviceUID = ?';
  
      db.query(getDeviceByIdQuery, [deviceUID], (error, result) => {
        if (error) {
          console.error('Error fetching device:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ message: 'Device not found' });
        }
  
        res.json(result[0]);
      });
    } catch (error) {
      console.error('Error fetching device:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  function updateDevice(req, res) {
    try {
      const deviceUID = req.params.deviceUID;
      const { EntryId, DeviceLocation, DeviceName, CompanyEmail, CompanyName } = req.body;
      const updateDeviceQuery =
        'UPDATE tms_devices SET EntryId=?, DeviceLocation=?, DeviceName=?, CompanyEmail=?, CompanyName=? WHERE DeviceUID=?';
  
      db.query(
        updateDeviceQuery,
        [EntryId, DeviceLocation, DeviceName, CompanyEmail, CompanyName, deviceUID],
        (error, result) => {
          if (error) {
            console.error('Error updating device:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
  
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Device not found' });
          }
  
          res.json({ message: 'Device updated successfully' });
        }
      );
    } catch (error) {
      console.error('Error updating device:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }



 
  function fetchCompanyDetails(req, res) {
    const CompanyEmail = req.params.CompanyEmail;
    const companyQuery = 'SELECT CompanyName, ContactNo, Location, Designation FROM tms_users WHERE CompanyEmail = ?';
  
    db.query(companyQuery, [CompanyEmail], (error, companyResult) => {
      if (error) {
        console.error('Error fetching company details:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (companyResult.length === 0) {
        console.log('company not found!');
        return res.status(404).json({ message: 'company not found!' });
      }
  
      const company = companyResult[0];
      res.json({ companyDetails: company });
    });
  }

  function fetchCounts(req, res) {
    const CompanyEmail = req.params.CompanyEmail;
    const standardUserCountQuery = 'SELECT COUNT(*) AS standardUserCount FROM tms_users WHERE CompanyEmail = ? AND UserType = "Standard"';
    const adminCountQuery = 'SELECT COUNT(*) AS adminCount FROM tms_users WHERE CompanyEmail = ? AND UserType = "Admin"';
    const deviceCountQuery = 'SELECT COUNT(*) AS deviceCount FROM tms_devices WHERE CompanyEmail = ?';
    const userCountQuery = 'SELECT COUNT(*) AS userCount FROM tms_users WHERE CompanyEmail = ?';
  
    try {
      db.query(standardUserCountQuery, [CompanyEmail], (error, standardUserResult) => {
        if (error) {
          console.error('Error fetching standard user count:', error);
          throw new Error('Internal server error');
        }
  
        const standardUserCount = standardUserResult[0].standardUserCount;
  
        db.query(adminCountQuery, [CompanyEmail], (error, adminResult) => {
          if (error) {
            console.error('Error fetching admin count:', error);
            throw new Error('Internal server error');
          }
  
          const adminCount = adminResult[0].adminCount;
  
          db.query(deviceCountQuery, [CompanyEmail], (error, deviceResult) => {
            if (error) {
              console.error('Error fetching device count:', error);
              throw new Error('Internal server error');
            }
  
            const deviceCount = deviceResult[0].deviceCount;
  
            db.query(userCountQuery, [CompanyEmail], (error, userResult) => {
              if (error) {
                console.error('Error fetching user count:', error);
                throw new Error('Internal server error');
              }
  
              const userCount = userResult[0].userCount;
  
              res.json({
                standardUserCount: standardUserCount,
                adminCount: adminCount,
                deviceCount: deviceCount,
                userCount: userCount,
              });
            });
          });
        });
      });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  function usermanagement(req, res) {
    const userQuery = 'SELECT UserId,Username,CompanyName, Designation,PersonalEmail,Location,ContactNo,Block FROM tms_users';
  
    db.query(userQuery, (error, userResult) => {
      if (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (userResult.length === 0) {
        console.log('users not found!');
        return res.status(404).json({ message: 'users not found!' });
      }
  
      const users = userResult;
      res.json({ userDetails: users });
    });
  }
  // function apilogs(req, res) {
  //   try {
  //     const timeInterval = req.params.interval; 
  //     if (!timeInterval) {
  //       return res.status(400).json({ message: 'Invalid time interval' });
  //     }
  
  //     let duration;
  //     switch (timeInterval) {

  //       case '10hour':
  //         duration = 'INTERVAL 10 HOUR';
  //         break;
  //       case '12hour':
  //         duration = 'INTERVAL 12 HOUR';
  //         break;
  //       case '1day':
  //         duration = 'INTERVAL 1 DAY';
  //         break;
  //       case '7day':
  //         duration = 'INTERVAL 7 DAY';
  //         break;
  //       case '30day':
  //         duration = 'INTERVAL 30 DAY';
  //         break;
  //         case '1year':
  //             duration = 'INTERVAL 365 DAY';
  //             break;
  //       default:
  //         return res.status(400).json({ message: 'Invalid time interval' });
  //     }
  
  //     const sql = `SELECT * FROM tmp_api_usage WHERE created_time >= DATE_SUB(NOW(), ${duration})`;
      
  //     db.query(sql, (error, results) => {
  //       if (error) {
  //         console.error('Error fetching data:', error);
  //         return res.status(500).json({ message: 'Internal server error' });
  //       }
  //       res.json({ data: results });
  //     });
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // }
  
  
    // function devicelogs(req, res) {
    //   try {
    //     const query = 'SELECT * FROM tms_devices';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching logs');
    //       }
    //       res.json({ logs: rows });
    //     });
    //   } catch (error) {
    //     console.error('Error fetching logs:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    function userInfo(req, res) {
      try {
        const query = 'SELECT * FROM user_info';
        db.query(query, (error, rows) => {
          if (error) {
            throw new Error('Error fetching logs');
          }
          res.json({ logs: rows });
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    function deviceInfo(req, res) {
      try {
        const query = 'SELECT * FROM dev_info';
        db.query(query, (error, rows) => {
          if (error) {
            throw new Error('Error fetching logs');
          }
          res.json({ logs: rows });
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    function companyinfo(req, res) {
      try {
        const query = 'SELECT * FROM company_info';
        db.query(query, (error, rows) => {
          if (error) {
            throw new Error('Error fetching logs');
          }
          res.json({ logs: rows });
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  
    // function alarms(req, res) {
    //   try {
    //     const query = 'SELECT * FROM tms_trigger';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching logs');
    //       }
    //       res.json({ logs: rows });
    //     });
    //   } catch (error) {
    //     console.error('Error fetching logs:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    function notification(req, res) {
      try {
        const query = 'SELECT * FROM info_twi';
        db.query(query, (error, rows) => {
          if (error) {
            throw new Error('Error fetching logs');
          }
          res.json({ logs: rows });
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    // function fetchLogs(req, res) {
    //   try {
    //     const timeInterval = req.params.interval; 
    //     if (!timeInterval) {
    //       return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     let duration;
    //     switch (timeInterval) {
    //       case '30min':
    //     duration = 'INTERVAL 30 MINUTE';
    //     break;
    //       case '10hour':
    //         duration = 'INTERVAL 10 HOUR';
    //         break;
    //       case '12hour':
    //         duration = 'INTERVAL 12 HOUR';
    //         break;
    //       case '1day':
    //         duration = 'INTERVAL 1 DAY';
    //         break;
    //       case '7day':
    //         duration = 'INTERVAL 7 DAY';
    //         break;
    //       case '30day':
    //         duration = 'INTERVAL 30 DAY';
    //         break;
    //         case '1year':
    //           duration = 'INTERVAL 365 DAY';
    //           break;
    //       default:
    //         return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     const sql = `SELECT * FROM logs WHERE timestamp >= DATE_SUB(NOW(), ${duration})`;
        
    //     db.query(sql, (error, results) => {
    //       if (error) {
    //         console.error('Error fetching data:', error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //       }
    //       res.json({ data: results });
    //     });
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
    // function graph1(req, res) {
    //   try {
    //     const timeInterval = req.params.interval; 
    //     if (!timeInterval) {
    //       return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     let duration;
    //     switch (timeInterval) {
    //       case '1day':
    //         duration = 'INTERVAL 1 DAY';
    //         break;
    //       case '7day':
    //         duration = 'INTERVAL 7 DAY';
    //         break;
    //       case '30day':
    //         duration = 'INTERVAL 30 DAY';
    //         break;
    //         case '1year':
    //           duration = 'INTERVAL 365 DAY';
    //           break;
    //       default:
    //         return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     const sql = `SELECT * FROM log_table WHERE timestamp >= DATE_SUB(NOW(), ${duration})`;
        
    //     db.query(sql, (error, results) => {
    //       if (error) {
    //         console.error('Error fetching data:', error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //       }
    //       res.json({ data: results });
    //     });
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
    // function graph2(req, res) {
    //   try {
    //     const timeInterval = req.params.interval;
    //     if (!timeInterval) {
    //       return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     let duration;
    //     switch (timeInterval) {
    //       case '1day':
    //         duration = 'INTERVAL 1 DAY';
    //         break;
    //       case '7day':
    //         duration = 'INTERVAL 7 DAY';
    //         break;
    //       case '30day':
    //         duration = 'INTERVAL 30 DAY';
    //         break;
    //       case '1year':
    //         duration = 'INTERVAL 365 DAY';
    //         break;
    //       default:
    //         return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     const sql = `SELECT * FROM log_count_table WHERE timestamp >= DATE_SUB(NOW(), ${duration})`;
    
    //     db.query(sql, (error, results) => {
    //       if (error) {
    //         console.error('Error fetching data:', error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //       }
    
          
    //         res.json({ data: results });
    //       });
        
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
    
    // function graph3(req, res) {
    //   try {
    //     const timeInterval = req.params.interval;
    //     if (!timeInterval) {
    //       return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     let duration;
    //     switch (timeInterval) {
    //       case '1day':
    //         duration = 'INTERVAL 1 DAY';
    //         break;
    //       case '7day':
    //         duration = 'INTERVAL 7 DAY';
    //         break;
    //       case '30day':
    //         duration = 'INTERVAL 30 DAY';
    //         break;
    //       case '1year':
    //         duration = 'INTERVAL 365 DAY';
    //         break;
    //       default:
    //         return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     const sql = `SELECT * FROM info_twi_log WHERE timestamp >= DATE_SUB(NOW(), ${duration})`;
    
    //     db.query(sql, (error, results) => {
    //       if (error) {
    //         console.error('Error fetching data:', error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //       }
          
    //         res.json({ data: results});
    //       });
        
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
    
    // function graph4(req, res) {
    //   try {
    //     const timeInterval = req.params.interval;
    //     if (!timeInterval) {
    //       return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     let duration;
    //     switch (timeInterval) {
    //       case '1day':
    //         duration = 'INTERVAL 1 DAY';
    //         break;
    //       case '7day':
    //         duration = 'INTERVAL 7 DAY';
    //         break;
    //       case '30day':
    //         duration = 'INTERVAL 30 DAY';
    //         break;
    //       case '1year':
    //         duration = 'INTERVAL 365 DAY';
    //         break;
    //       default:
    //         return res.status(400).json({ message: 'Invalid time interval' });
    //     }
    
    //     const sql = `SELECT * FROM tmp WHERE Date >= DATE_SUB(NOW(), ${duration})`;
    
    //     db.query(sql, (error, results) => {
    //       if (error) {
    //         console.error('Error fetching data:', error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //       }
    //       res.json({ data: results });
    //     });
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }

// function monitorAndSyncDevices() {
//   const selectQuery = 'SELECT DeviceUID, DeviceName, CompanyName, CompanyEmail, status, type FROM tms_devices';

//   db.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error('Error fetching data from tms_devices:', err);
//       return;
//     }

//     // Loop through the results and update alarms
//     results.forEach((row) => {
//       const { DeviceUID, DeviceName, CompanyName, CompanyEmail, status, type } = row;

//       // Update the existing record in alarms
//       const updateAlarmQuery = `
//         UPDATE tms_trigger
//         SET DeviceName=?, company_name=?, CompanyEmail=?, status=?, type=?
//         WHERE DeviceUID=?
//       `;

//       db.query(
//         updateAlarmQuery,
//         [DeviceName, CompanyName, CompanyEmail, status, type, DeviceUID],
//         (updateErr, updateResult) => {
//           if (updateErr) {
//             console.error('Error updating alarm:', updateErr);
//           } else {
//             //console.log(`Updated alarm for DeviceUID: ${DeviceUID}`);
//           }
//         }
//       );
//     });
//   });
// }

// Set an interval to periodically call the monitorAndSyncDevices function (every 1 minute)
//const intervalInMinutes = 1;
//setInterval(monitorAndSyncDevices, intervalInMinutes * 60 * 1000);

// Initial call to start monitoring
//monitorAndSyncDevices();
    
    function deleteDevice(req, res) {
      try {
        const deviceUID = req.params.deviceUID;
        const deleteDeviceQuery = 'DELETE FROM tms_devices WHERE deviceuid = ?';
    
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

    function removeUser(req, res) {
      const userId = req.params.userId; 
      const getUserQuery = 'SELECT * FROM tms_users WHERE UserId = ?';
      db.query(getUserQuery, [userId], (error, userResult) => {
        if (error) {
          console.error('Error during user retrieval:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
    
        try {
          if (userResult.length === 0) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
          }
          const deleteUserQuery = 'DELETE FROM tms_users WHERE UserId = ?';
          db.query(deleteUserQuery, [userId], (error, deleteResult) => {
            if (error) {
              console.error('Error during user deletion:', error);
              return res.status(500).json({ message: 'Internal server error' });
            }
    
            try {
              console.log('User deleted successfully');
              res.json({ message: 'User deleted successfully' });
            } catch (error) {
              console.error('Error responding to user deletion:', error);
              res.status(500).json({ message: 'Internal server error' });
            }
          });
        } catch (error) {
          console.error('Error during user removal:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    }

    function deviceCount(req, res) {
      const deviceQuery = 'SELECT COUNT(*) AS deviceCount FROM tms_devices';
      const activeQuery = 'SELECT COUNT(*) AS activeCount FROM tms_devices WHERE  status = "1"';
      const inactiveQuery = 'SELECT COUNT(*) AS inactiveCount FROM tms_devices WHERE status = "0"';
      
      try {
        db.query(deviceQuery, (error, deviceQuery) => {
          if (error) {
            console.error('Error fetching standard user count:', error);
            throw new Error('Internal server error');
          }
    
          const deviceCount = deviceQuery[0].deviceCount;
    
          db.query(activeQuery, (error, activeResult) => {
            if (error) {
              console.error('Error fetching admin count:', error);
              throw new Error('Internal server error');
            }
    
            const activeCount = activeResult[0].activeCount;
    
            db.query(inactiveQuery,(error, inactiveResult) => {
              if (error) {
                console.error('Error fetching device count:', error);
                throw new Error('Internal server error');
              }
    
              const inactiveCount = inactiveResult[0].inactiveCount;
                res.json({
                  deviceCount: deviceCount,
                  activeCount:activeCount,
                  inactiveCount:inactiveCount
                  
                });
              });
            });
          });
      
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    
    // function transportdata(req, res) {
    //   try {
    //     const query = 'SELECT AttributeValue, TotalValue FROM ComponentData WHERE functionName = "Transport"';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching data');
    //       }
    //       res.json({ data: rows });
          
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    // function ruleEnginedata(req, res) {
    //   try {
    //     const query = 'SELECT AttributeValue, TotalValue FROM ComponentData WHERE functionName = "Rule Engine"';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching data');
    //       }
    //       res.json({ data: rows });
          
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    // function JSdata(req, res) {
    //   try {
    //     const query = 'SELECT AttributeValue, TotalValue FROM ComponentData WHERE functionName = "Java Script"';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching data');
    //       }
    //       res.json({ data: rows });
          
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    // function telementrydata(req, res) {
    //   try {
    //     const query = 'SELECT AttributeValue, TotalValue FROM ComponentData WHERE functionName = " Telementry"';
    //     db.query(query, (error, rows) => {
    //       if (error) {
    //         throw new Error('Error fetching data');
    //       }
    //       res.json({ data: rows });
          
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
  
    //Update comp 

    // function updateCompanyInfo() {
    //   const getCompanyNamesQuery = 'SELECT DISTINCT CompanyName FROM tms_users';
    
    //   try {
    //     db.getConnection((err, connection) => {
    //       if (err) {
    //         console.error('Error getting a database connection:', err);
    //         return;
    //       }
    
    //       connection.query(getCompanyNamesQuery, (err, results) => {
    //         if (err) {
    //           console.error('Error fetching company names:', err);
    //           connection.release();
    //           return;
    //         }
    
    //         const companyNames = results.map((row) => row.CompanyName);
    
    //         // Retrieve existing company names from the company_info table
    //         const existingCompanyNamesQuery = 'SELECT company_name FROM company_info';
    //         connection.query(existingCompanyNamesQuery, (err, existingCompanyNames) => {
    //           if (err) {
    //             console.error('Error fetching existing company names:', err);
    //             connection.release();
    //             return;
    //           }
    
    //           // Check if each existing company name exists in the retrieved list
    //           existingCompanyNames.forEach((existingCompanyName) => {
    //             if (!companyNames.includes(existingCompanyName.company_name)) {
    //               // Delete company data if the company name is not in the list
    //               const deleteCompanyDataQuery = 'DELETE FROM company_info WHERE company_name = ?';
    //               connection.query(deleteCompanyDataQuery, [existingCompanyName.company_name], (err) => {
    //                 if (err) {
    //                   console.error(`Error deleting old company data for ${existingCompanyName.company_name}:`, err);
    //                 }
    //               });
    //             }
    //           });
    
    //           // Calculate statistics for each company
    //           for (const companyName of companyNames) {
    //             calculateCompanyStatistics(connection, companyName);
    //           }
    
    //           connection.release();
    //         });
    //       });
    //     });
    //   } catch (err) {
    //     console.error('Error updating company info:', err);
    //   }
    // }
    
    // function calculateCompanyStatistics(connection, companyName) {
    //   const userCountQuery = 'SELECT COUNT(*) AS total_users FROM tms_users WHERE CompanyName = ?';
    //   const activeUserCountQuery = 'SELECT COUNT(*) AS active_users FROM tms_users WHERE CompanyName = ? AND is_online = 1';
    //   const inactiveUserCountQuery = 'SELECT COUNT(*) AS inactive_users FROM tms_users WHERE CompanyName = ? AND is_online = 0';
    
    //   connection.query(userCountQuery, [companyName], (err, [userCountResult]) => {
    //     if (err) {
    //       console.error(`Error calculating total users for ${companyName}:`, err);
    //       return;
    //     }
    
    //     connection.query(activeUserCountQuery, [companyName], (err, [activeUserCountResult]) => {
    //       if (err) {
    //         console.error(`Error calculating active users for ${companyName}:`, err);
    //         return;
    //       }
    
    //       connection.query(inactiveUserCountQuery, [companyName], (err, [inactiveUserCountResult]) => {
    //         if (err) {
    //           console.error(`Error calculating inactive users for ${companyName}:`, err);
    //           return;
    //         }
    
    //         const totalUsers = userCountResult.total_users;
    //         const activeUsers = activeUserCountResult.active_users;
    //         const inactiveUsers = inactiveUserCountResult.inactive_users;
    //         const insertCompanyDataQuery = 'INSERT INTO company_info (company_name, total_users, active_users, inactive_users) VALUES (?, ?, ?, ?)';
    //         const deleteCompanyDataQuery = 'DELETE FROM company_info WHERE company_name = ?';
    
    //         connection.query(deleteCompanyDataQuery, [companyName], (err) => {
    //           if (err) {
    //             console.error(`Error deleting old company data for ${companyName}:`, err);
    //             return;
    //           }
    //           if(companyName != null){
    //           connection.query(insertCompanyDataQuery, [companyName, totalUsers, activeUsers, inactiveUsers], (err) => {
    //             if (err) {
    //               console.error(`Error inserting company data for ${companyName}:`, err);
    //             }
              
    //           });
    //         }
    //         });

    //       });
    //     });
    //   });
    // }
    
    // updateCompanyInfo();

    //dev count 

// function updateDeviceInfo() {
//   const activeDeviceCountQuery = 'SELECT COUNT(*) as active_device_count FROM tms_devices WHERE status IN ("online", "heating")';
//   const inactiveDeviceCountQuery = 'SELECT COUNT(*) as inactive_device_count FROM tms_devices WHERE status = "offline"';
//   const totalDeviceCountQuery = 'SELECT COUNT(*) as total_device_count FROM tms_devices';

//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }

//     // Start a transaction to ensure data consistency
//     connection.beginTransaction((err) => {
//       if (err) {
//         console.error('Error starting transaction:', err);
//         connection.release();
//         return;
//       }

//       // Delete old data from the dev_info table
//       const deleteStatisticsQuery = 'DELETE FROM dev_info';
//       connection.query(deleteStatisticsQuery, (err) => {
//         if (err) {
//           console.error('Error deleting old device statistics:', err);
//           connection.rollback(() => {
//             console.error('Transaction rolled back.');
//             connection.release();
//           });
//           return;
//         }

//         // Fetch active device count
//         connection.query(activeDeviceCountQuery, (err, activeDeviceCountResult) => {
//           if (err) {
//             console.error('Error calculating active device count:', err);
//             connection.rollback(() => {
//               console.error('Transaction rolled back.');
//               connection.release();
//             });
//             return;
//           }

//           const activeDeviceCount = activeDeviceCountResult[0].active_device_count;

//           // Fetch inactive device count
//           connection.query(inactiveDeviceCountQuery, (err, inactiveDeviceCountResult) => {
//             if (err) {
//               console.error('Error calculating inactive device count:', err);
//               connection.rollback(() => {
//                 console.error('Transaction rolled back.');
//                 connection.release();
//               });
//               return;
//             }

//             const inactiveDeviceCount = inactiveDeviceCountResult[0].inactive_device_count;

//             // Fetch total device count
//             connection.query(totalDeviceCountQuery, (err, totalDeviceCountResult) => {
//               if (err) {
//                 console.error('Error calculating total device count:', err);
//                 connection.rollback(() => {
//                   console.error('Transaction rolled back.');
//                   connection.release();
//                 });
//                 return;
//               }

//               const totalDeviceCount = totalDeviceCountResult[0].total_device_count;

//               // Insert the calculated statistics into the dev_info table
//               const insertDeviceInfoQuery = 'INSERT INTO dev_info (all_devices, active_devices, inactive_devices) VALUES (?, ?, ?)';
//               connection.query(insertDeviceInfoQuery, [totalDeviceCount, activeDeviceCount, inactiveDeviceCount], (err) => {
//                 if (err) {
//                   console.error('Error inserting device info:', err);
//                   connection.rollback(() => {
//                     console.error('Transaction rolled back.');
//                     connection.release();
//                   });
//                 } else {
//                   connection.commit((err) => {
//                     if (err) {
//                       console.error('Error committing transaction:', err);
//                       connection.rollback(() => {
//                         console.error('Transaction rolled back.');
//                         connection.release();
//                       });
//                     } else {
//                       //console.log('Device info updated successfully.');
//                       connection.release();
//                     }
//                   });
//                 }
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// }

//Graph logs


// function extractIPv4(ipv6MappedAddress) {
//     const parts = ipv6MappedAddress.split(':');
//     return parts[parts.length - 1];
//   }

// function log(req, res, next) {
//     const { method, url, body, ip } = req;
//     const timestamp = new Date().toISOString();
//     const entity = body.userType || 'User';
//     const entityName = body.companyName || 'SenseLive';
//     const user = req.body.Username || req.body.companyEmail || 'N/A';
//     const userType = req.body.designation || 'std';
//     const type = method; 
//     const status = res.statusCode >= 200 && res.statusCode < 400 ? 'successful' : 'failure';
//     const details = `URL: ${url}`;
    
//     const ipv4Address = extractIPv4(ip);
  
//     const logMessage = `${timestamp} | IP: ${ipv4Address} | Entity Type: ${entity} | Entity Name: ${entityName} | User: ${user} (${userType}) | Type: ${type} | Status: ${status} | Details: ${details}`;
  
//     db.query('INSERT INTO tms.logs (timestamp, ip, entity_type, entity_name, username, user_type, request_type, status, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [timestamp, ipv4Address, entity, entityName, user, userType, type, status, details],
//       function (error, results) {
//         if (error) {
//           console.error('Error writing to database:', error);
//         } else {
//           //console.log('Log data inserted into the database');
//         }
//         next();
//       });
// }

// function monitorLogsAndLogCount() {
//   const currentTimestamp = new Date().toISOString();
//   const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

//   const query = `
//     SELECT COUNT(*) as requestCount
//     FROM tmp.logs
//     WHERE timestamp >= ? AND timestamp <= ?;
//   `;

//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting database connection:', err);
//       return;
//     }

//     connection.query(query, [fifteenMinutesAgo, currentTimestamp], (error, results) => {
//       if (error) {
//         console.error('Error querying the database for request count:', error);
//         connection.release();
//       } else {
//         const requestCount = results[0].requestCount;

//         const insertQuery = `
//           INSERT INTO log_count_table (timestamp, request_count)
//           VALUES (?, ?);
//         `;

//         connection.query(insertQuery, [currentTimestamp, requestCount], (insertError) => {
//           if (insertError) {
//             console.error('Error inserting request count into log_count_table:', insertError);
//           } else {
//             console.log('Logged request count successfully:', requestCount);
//           }

//           connection.release();
//         });
//       }
//     });
//   });
// }
//Graph SMS


// function notiLog() {
//   const currentTimestamp = new Date().toISOString();
//   const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

//   const query = `
//     SELECT COUNT(*) as requestCount
//     FROM info_twi
//     WHERE created_time >= ? AND created_time <= ?;
//   `;

//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting database connection:', err);
//       return;
//     }

//     connection.query(query, [fifteenMinutesAgo, currentTimestamp], (error, results) => {
//       if (error) {
//         console.error('Error querying the database:', error);
//         connection.release();
//       } else {
//         const requestCount = results[0].requestCount;

//         const insertQuery = `
//           INSERT INTO info_twi_log (timestamp, request_count)
//           VALUES (?, ?);
//         `;

//         connection.query(insertQuery, [currentTimestamp, requestCount], (insertError) => {
//           if (insertError) {
//             console.error('Error inserting into log_table:', insertError);
//           } else {
//             console.log('Logged request count successfully:', requestCount);
//           }

//           connection.release();
//         });
//       }
//     });
//   });
// }

//Graph logs

// function logExecution(functionName, tenantId, status, message) {
//     const createdTime = new Date().toISOString(); 
//     const entity_type = 'SenseLive';
//     const entity_id = tenantId; 
//     const transport = 'ENABLED'; 
//     const db_storage = 'ENABLED'; 
//     const re_exec = 'ENABLED'; 
//     const js_exec = 'ENABLED';
//     const email_exec = 'ENABLED';
//     const sms_exec = 'ENABLED'; 
//     const alarm_exec = 'ENABLED';
  
//     const query = `
//       INSERT INTO tmp_api_usage (created_time, tenant_id, entity_type, entity_id, transport, db_storage, re_exec, js_exec, email_exec, sms_exec, alarm_exec, status, message)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;
  
//     db.query(query, [
//       createdTime,
//       tenantId,
//       entity_type,
//       entity_id,
//       transport,
//       db_storage,
//       re_exec,
//       js_exec,
//       email_exec,
//       sms_exec,
//       alarm_exec,
//       status,
//       message,
//     ], (error, results) => {
//       if (error) {
//         console.error(`Error logging execution of function '${functionName}':`, error);
//       } else {
//         console.log(`Function '${functionName}' executed and logged successfully.`);
//       }
//     });
//   }

// function JsLog() {
//   const currentTimestamp = new Date().toISOString();
//   const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

//   const query = `
//     SELECT COUNT(*) as requestCount
//     FROM tmp_api_usage
//     WHERE created_time >= ? AND created_time <= ?;
//   `;

//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting database connection:', err);
//       return;
//     }

//     connection.query(query, [fifteenMinutesAgo, currentTimestamp], (error, results) => {
//       if (error) {
//         console.error('Error querying the database:', error);
//         connection.release();
//       } else {
//         const requestCount = results[0].requestCount;

//         const insertQuery = `
//           INSERT INTO log_table (timestamp, request_count)
//           VALUES (?, ?);
//         `;

//         connection.query(insertQuery, [currentTimestamp, requestCount], (insertError) => {
//           if (insertError) {
//             console.error('Error inserting into log_table:', insertError);
//           } else {
//             console.log('Logged request count successfully:', requestCount);
//           }

//           connection.release();
//         });
//       }
//     });
//   });
// }

//User Count

// function userInfoscript() {
//   // Define variables in the outermost scope
//   let totalUsers, activeUsers, inactiveUsers;

//   const userCountQuery = 'SELECT COUNT(*) as total_users FROM tms_users';
//   const activeUserCountQuery = 'SELECT COUNT(*) as active_users FROM tms_users WHERE is_online = 1';
//   const inactiveUserCountQuery = 'SELECT COUNT(*) as inactive_users FROM tms_users WHERE is_online = 0';

//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }

//     // Start a transaction to ensure data consistency
//     connection.beginTransaction((err) => {
//       if (err) {
//         console.error('Error starting Inserted:', err);
//         connection.release();
//         return;
//       }

//       // Delete old data from user_info table
//       const deleteStatisticsQuery = 'DELETE FROM user_info';
//       connection.query(deleteStatisticsQuery, (err) => {
//         if (err) {
//           console.error('Error deleting old user statistics:', err);
//           connection.rollback(() => {
//             console.error('Inserted rolled back.');
//             connection.release();
//           });
//           return;
//         }

//         // After deleting old data, proceed to fetch new data and insert it
//         connection.query(userCountQuery, (err, userCountResult) => {
//           if (err) {
//             console.error('Error calculating total users:', err);
//             connection.rollback(() => {
//               console.error('Inserted rolled back.');
//               connection.release();
//             });
//             return;
//           }

//           // Assign values to the variables
//           totalUsers = userCountResult[0].total_users;

//           connection.query(activeUserCountQuery, (err, activeUserCountResult) => {
//             if (err) {
//               console.error('Error calculating active users:', err);
//               connection.rollback(() => {
//                 console.error('Inserted rolled back.');
//                 connection.release();
//               });
//               return;
//             }

//             // Assign values to the variables
//             activeUsers = activeUserCountResult[0].active_users;

//             connection.query(inactiveUserCountQuery, (err, inactiveUserCountResult) => {
//               if (err) {
//                 console.error('Error calculating inactive users:', err);
//                 connection.rollback(() => {
//                   console.error('Inserted rolled back.');
//                   connection.release();
//                 });
//                 return;
//               }

//               // Assign values to the variables
//               inactiveUsers = inactiveUserCountResult[0].inactive_users;

//               // Insert the calculated statistics into the user_info table
//               const insertStatisticsQuery = 'INSERT INTO user_info (all_users, active_users, inactive_users) VALUES (?, ?, ?)';
//               connection.query(insertStatisticsQuery, [totalUsers, activeUsers, inactiveUsers], (err) => {
//                 if (err) {
//                   console.error('Error inserting user statistics:', err);
//                   connection.rollback(() => {
//                     console.error('Inserted rolled back.');
//                     connection.release();
//                   });
//                 } else {
//                   connection.commit((err) => {
//                     if (err) {
//                       console.error('Error committing Inserted:', err);
//                       connection.rollback(() => {
//                         console.error('Inserted rolled back.');
//                         connection.release();
//                       });
//                     } else {
//                       //console.log('Inserted successfully.');
//                       connection.release();
//                     }
//                   });
//                 }
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// }

/*setInterval(userInfoscript, 10000);
setInterval(JsLog,  15 * 60 * 1000);
setInterval(notiLog,  15 * 60 * 1000);
setInterval(monitorLogsAndLogCount,  15 * 60 * 1000);
setInterval(updateDeviceInfo, 10000);
setInterval(updateCompanyInfo, 10000);*/
  
  
module.exports = {
  fetchAllUsers,
  fetchAllDevices,
  fetchCompanyDetails,
  getDeviceByUID,
  updateDevice,
  fetchCounts,
  usermanagement,
  //apilogs,
  //devicelogs,
  userInfo,
  deviceInfo,
  companyinfo,
  // alarms,
  notification,
  // fetchLogs,
  deleteDevice,
  removeUser,
  deviceCount,
  // graph1,
  // graph2,
  // graph3,
  // graph4,
  userByCompanyname,
  // transportdata,
  // ruleEnginedata,
  // JSdata,
  // telementrydata,
  // log,
  // logExecution
};