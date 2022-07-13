import userMod from '../models/user_m.js'
import {Op} from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



 const getUser=async(req,res)=>{
      const page =parseInt(req.query.page) || 0
      const limit=parseInt(req.query.limit) ||10;
      const search =req.query.search_query ||""
      const offset=limit * page
      const totalRows=await userMod.Users.count(
        {
                where :{
                        [Op.or]:[{name:{
                                [Op.like]: '%' +search+ '%'
                        }},{email:{
                                [Op.like]: '%' +search+ '%'
                        }}]
                }
        }
      );
      const totalPage=Math.ceil(totalRows/limit)
      const result=await userMod.Users.findAll(
        
        {
        attributes:['id','name','email'],        
        where :{
                [Op.or]:[{name:{
                        [Op.like]: '%' +search+ '%'
                }},{email:{
                        [Op.like]: '%' +search+ '%'
                }}]
        },
        offset:offset,
        limit:limit,
        order:[
                ['id','DESC']
        ]
       })

      res.json({
        page:page,
        limit:limit,
        totalRows:totalRows,
        totalPage:totalPage,
        result:result,
        
      })


} 


 const Login=async(req,res)=>{
        const {email,password}=req.body
        if(email=='' ||password=='')return res.status(403).json({msg:"Lengkapi Data"})


        try {
                const user=await userMod.Users.findAll({
                        where:{
                                email:email
                        }
                })
                if (user.length<1)return res.status(404).json({msg:"Email Tidak Ditemukan"});

                const match=await bcrypt.compare(password,user[0].password);
                if(!match)return res.status(400).json({msg:"Wrong Password"})
                const userId=user[0].id
                const userName=user[0].name
                const userEmail=user[0].email
                const accessToken=jwt.sign({userId,userName,userEmail},process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn :'20s'
                })
                const refreshToken=jwt.sign({userId,userName,userEmail},process.env.REFRESH_TOKEN_SECRET,{
                        expiresIn :'1d'
                })
                await userMod.loginHistory.update({refresh_token:refreshToken},{
                        where:{
                                email:userEmail
                        }
                });
                await userMod.loginHistory.create({
                        email:userEmail,
                        refresh_token:refreshToken,
                        device:''
                });

                res.cookie('refreshToken', refreshToken,
                 { maxAge: 86400000, 
                        httpOnly: true
                 })

              
                res.json({accessToken})
        } catch (error) {
                res.status(404).json({msg:error.toString})
                console.log(error)
        }
 }



 const Register=async(req,res)=>{

        const {name,email,gender,password,confPassword}=req.body
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(name=='' ||password=='' ||confPassword=='')return res.status(403).json({msg:"Lengkapi Data"})
        if (password !==confPassword) return res.status(400).json({msg:"Password Dan Konfirmasi Password tidak sama"});
        if(password.length<6)  return res.status(400).json({msg:"Password Minimal 6 karakter"});
        if(!email.match(mailformat)) return res.status(400).json({msg:"Email Tidak Valid"});

        const salt= await bcrypt.genSalt();
        const hashPassword=await bcrypt.hash(password,salt);

        const getEmail=await userMod.Users.findAll({
                where:{
                        email:email
                }
        })

        if(getEmail.length>0) return res.status(403).json({msg:"Email Sudah Ada"});
        try {
                await userMod.Users.create({
                        name:name,
                        email:email,
                        gender:gender,
                        password:hashPassword
                })
                res.json({msg:"Register Berhasil"})
        } catch (error) {
                return res.status(404).json({msg:"Gagal Register"})        }
 }


const Logout=async(req,res)=>{
        try {
                const refreshToken=req.cookies.refreshToken
                if(!refreshToken) return res.sendStatus(204)
                const user= await userMod.loginHistory.findAll({
                    where:{
                        refresh_token:refreshToken
                    }
                })
                if(!user[0])return res.sendStatus(204)
                const UserId=user[0].email

                await userMod.loginHistory.destroy({
                        where :{
                                email:UserId
                        }
                })
                res.clearCookie('refreshToken')
                res.sendStatus(200)
              
            } catch (error) {
                res.sendStatus(204)
            }
}

const resetPassword=async(req,res)=>{
        const {password,confPassword,email}=req.body
        if(password==null  ||email=='')return res.json({msg:"Silahkan Isi Email"})
        const salt= await bcrypt.genSalt();
        const hashPassword=await bcrypt.hash(password,salt);
        const response=await userMod.Users.update({
             password:hashPassword  
        },
        {
                where :{
                        email:email
                }
        })
        const reset=await userMod.ResetPassword.update({
                status:"Berhasil"  
           },
           {
                   where :{
                           refresh_token:req.params.token
                   }
           })


        res.json({response})
      
}

const sendLinkResetPassword=async(req,res)=>{
        const {email,status}=req.body
        if(email=='')return res.json({msg:"Silahkan Isi Email"})
        
        try {
                const user=await userMod.Users.findAll({
                        where:{
                                email:email
                        }
                })

               if(user.length==0) return res.json({msg:"Email Tidak Ditemukan"}); 

                 
        } catch (error) {
             return   res.sendStatus(400).json({msg:"Email Tidak Ditemukan"})  
        }
                    const accessToken=jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn :'300s'
                })

                userMod.ResetPassword.create({

                        email:email,
                        refresh_token:accessToken,
                        status:status
                })

                return res.json({accessToken:"Silahkan Cek Email Anda"}); 
}


 export { Register,getUser,Login,Logout,sendLinkResetPassword,resetPassword}