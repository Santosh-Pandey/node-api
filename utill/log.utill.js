const log4js = require('log4js');

exports.logprocess = function (logdataapi,filename) {

    currentDate = new Date().toISOString().slice(0,10);
    file_name = 'logs/'+filename+'-'+currentDate+'.log';

    log4js.configure({
        appenders: { logs: { type: 'file', filename: file_name ,pattern: '.yyyy-MM-dd-hh' } },
        categories: { default: { appenders: ['logs'], level: 'info' } }
    });
    
    const logger = log4js.getLogger('logs');
    logger.info(logdataapi);

    return Date();
};