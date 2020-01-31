var jwt = require('jsonwebtoken');


module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'santoshpandeykey', function(err, decoded) {
        if (err) {
            return res.json({"error": 1, "message": 'Failed to authenticate token.' });
        }
      req.decoded = decoded;
      next();
    });

  } else {

    // if there is no tokenreturn an error
    return res.status(403).send({
        "error": 1,
        "message": 'No token provided.'
    });

  }

}