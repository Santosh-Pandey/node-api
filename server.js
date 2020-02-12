const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');
// create express app
const app = express();
app.use(cors());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
//app.use(express.static('uploads'));


const redis = require("redis");


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// this route without token validating route
require('./app/routes/auth.route.js')(app);


//#####app.use(require('./middlewares/TokenValidator.js'));
// Require Notes routes; these route without token validating route
require('./app/routes/note.routes.js')(app);
require('./app/routes/contec.route.js')(app);



/************** Include Mongo connection *****************/
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Successfully connected to the MySql database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/**************End Include Mongo connection *****************/



/*****My sql DB Connection Import */
const mySqldbConfig = require('./config/databasemysql.config.js');

connection  = mySqldbConfig.connection;
connection.connect(function(err){
    if (err){
        console.log('error connecting:' + err.stack);
        process.exit();
    }else{
        console.log('connected successfully to DB.');
    }
    
});

// Redis Connection
var rediscl = redis.createClient();
rediscl.on("connect", function (err) {
    if(err){
        console.log('error connecting:' + err.stack);
        process.exit();
    }else{
        console.log("Redis plugged in.");
    }
});








// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});