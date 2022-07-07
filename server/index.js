import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRouter from '../server/src/routers/user_r.js'

dotenv.config()
const app=express()
app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))

app.use(bodyparser.json({ limit: '100mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))
app.use(userRouter)



app.get('/',(err,res)=>{
    res.send("Wellcome")
})

app.listen('5000',(()=>{
    console.log("server running")
}))