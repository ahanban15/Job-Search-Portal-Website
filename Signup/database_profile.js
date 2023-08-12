var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '1234#Ahan', 
  database: 'profile_db',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Profile Database connected')
})
module.exports = connection