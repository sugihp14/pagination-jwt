
import express from 'express'
import  {getUser,Register,Login,Logout,sendLinkResetPassword,resetPassword}  from "../controllers/user_c.js"; 
import  {VerifyToken,verifyResetPassword,verifyLinkReset} from '../middleware/VerifyToken.js'
import refToken from '../controllers/refreshToken.js'

const Router=express.Router();


Router.get('/users',VerifyToken,getUser)
Router.post('/register',Register)
Router.post('/login',Login)
Router.get('/token',refToken)
Router.delete('/logout',Logout)
Router.post('/sendLinkReset',sendLinkResetPassword)
Router.post('/resetpassword/:token',verifyResetPassword,resetPassword)
Router.get('/resetpassword/:token',verifyLinkReset)

export default Router
