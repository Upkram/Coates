const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    "coates",
    "root",
    "",
    {
        host:'localhost',
        dialect:'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log('connection has been established successfully');
}).catch((error)=>{
    console.error('unable to connect');
});
const Users = sequelize.define("users",{
    name:{
        type:DataTypes.STRING(50),
    },
    email:{
        type:DataTypes.STRING(50),
    },
    dob:{
        type:DataTypes.DATE,
    },    
});
sequelize.sync().then(()=>{
    console.log('User Table created Successfully');
}).catch((error)=>{
    console.error('unable to create table');
});
module.exports = Users;
