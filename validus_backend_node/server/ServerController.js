var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var osutils = require('os-utils');
var VerifyToken = require('../auth/VerifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL THE SERVER INFO
router.get('/', VerifyToken, function(req, res, next){
    res.status(200).send({
        "system_uptime": osutils.sysUptime(),
        "number_cpu": osutils.cpuCount(),
        "os_type": osutils.platform(),
        "load_average_5_min": osutils.loadavg(5),
        "total_memory_MB" : osutils.totalmem(),
        "free_memory_MB": osutils.freemem(),
        "free_memory_percentage": osutils.freememPercentage()
    });

});


module.exports = router;