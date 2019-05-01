var express = require('express');
var router = express.Router();


require('./routes/chercheur')(router);



module.exports = router;