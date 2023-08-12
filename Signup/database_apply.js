var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '1234#Ahan', 
  database: 'apply_db',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Apply Database connected')
})
module.exports = connection