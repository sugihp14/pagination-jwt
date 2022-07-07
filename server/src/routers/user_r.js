
import express from 'express'
import  {getUser,Register,Login,Logout}  from "../controllers/user_c.js"; 
import VerifyToken from '../middleware/VerifyToken.js'
import refToken from '../controllers/refreshToken.js'
const Router=express.Router();


Router.get('/users',VerifyToken,getUser)
Router.post('/register',Register)
Router.post('/login',Login)
Router.get('/token',refToken)
Router.delete('/logout',Logout)

export default Router
