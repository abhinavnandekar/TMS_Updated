const express = require('express');
const cors = require('cors');
const router = require('./routes');
// const fs = require('fs');
const bodyParser = require('body-parser');
//const SA = require('./superadmin/SA');
//const TMS_logs = require('./tms_trigger_logs');


const app = express();

const port = 3000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//app.use(SA.log);

// Use the router for handling routes
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

