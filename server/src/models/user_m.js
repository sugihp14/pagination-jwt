import db from '../config/db.js'
import Sequelize from 'sequelize'


const DataTypes=Sequelize;
const Users=db.define('user',{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    gender:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    }
},{
    freezeTableName:true

});

(async()=>{
    await db.sync()
})()


export default Users

