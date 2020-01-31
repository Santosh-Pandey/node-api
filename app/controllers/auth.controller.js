var jwt = require('jsonwebtoken');
var mylog = require('../../utill/log.utill.js');

exports.login = (req, res) => {

    var username = req.body.username;
    var password = req.body.password;
    result = {};
    if(username == 'santosh' && password=='123456'){
    
        var response = {"status": "true"};
        var token = jwt.sign(response, 'santoshpandeykey', {
            expiresIn: 1440 // expires in 1 hours
        });

        result.error = 0;
        result.message = 'Validation successful!';
        result.token = token;

        
    }else{
       
        result.error = 1;
        result.message = 'Login Validation failed!';

    }


    // Create Logs
    log= {};
    log.header = req.headers;
    log.request = req.body;
    log.response = result;
    var logdata = JSON.stringify(log);
    
    //Call Log Module
    mylog.logprocess(logdata, 'testlog');


    //Response
    res.send(JSON.stringify(result));
};



