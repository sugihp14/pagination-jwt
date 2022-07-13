import jwt from 'jsonwebtoken'
import users from '../models/user_m.js'


const RefreshToken=async(req,res)=>{
    try {
        const refreshToken=req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        const user= await users.loginHistory.findAll({
            where:{
                refresh_token:refreshToken
            }
        })
        if(!user[0])return res.sendStatus(401)
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
            if(err)return res.sendSstatus(403)
            const UserId=user[0].id
            const name=user[0].name
            const email=user[0].email
            const accessToken=jwt.sign({UserId,name,email},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'20s'
            })
            res.json(accessToken)
        })
    } catch (error) {
       
        res.sendStatus(204)
    }
}

export default RefreshToken