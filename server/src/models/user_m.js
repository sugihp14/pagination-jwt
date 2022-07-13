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

const loginHistory=db.define('login_history',{
 
        email:{
            type:DataTypes.STRING
        },
        refresh_token:{
            type:DataTypes.TEXT
        },
        device:{
            type:DataTypes.STRING
        },
    
},{
    freezeTableName:true

});

const ResetPassword=db.define('reset_password',{   
    email:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
    status:{
        type:DataTypes.STRING
    },
});



(async()=>{
    await db.sync()
})()


export default { Users,loginHistory,ResetPassword}

