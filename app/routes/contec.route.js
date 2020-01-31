module.exports = (app) => {
    const contec = require('../controllers/contec.controller.js');

    // Retrieve all driver
    app.get('/getDriver', contec.findAll);

    
}