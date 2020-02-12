exports.uploadfile = function (myfile, callback) {

        callback = callback || function(){};
        
        //const path = __dirname + '/images/' + myfile.name
        const path = 'Uploads/' + myfile.name
        
        var result = '';
        myfile.mv(path, (error) => {
            if (error) {

              //result = JSON.stringify({ status: 'error', message: error })
              result = false;
            }else{
               //result = JSON.stringify({ status: 'success', path: '/images/' + myfile.name })
               result = true;
            }
            
            return callback(null, result);
       })
}; 
    
