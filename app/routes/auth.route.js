module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    // Retrieve all driver
    app.post('/login', auth.login);

    
}