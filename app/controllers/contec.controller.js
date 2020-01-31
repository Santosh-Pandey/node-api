exports.findAll = (req, res) => {
    
    connection.query('select * from drivers', function(error, results){
        if ( error ){
            res.status(400).send('Error in database operation');
        } else {
            res.send(results);
        }
    });

};



