
const db = require('./config/database'); 


  db.query("SELECT * FROM Users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);   
    });
  
  db.query("SELECT * FROM Posts", function (err, result, fields) {
      if (err) throw err;
      console.log(result);  
    });
  
  db.query("SELECT * FROM Likes", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
 
    db.query("SELECT * FROM Comments", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      db.end()
    });
