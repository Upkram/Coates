const mysql = require('mysql2');


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"coates",
    port:"3306"
})
db.connect(function(error){
if(error)
{
    throw error;
}
else
{
    console.log("DB connect successfully");
}
})

module.exports = db;