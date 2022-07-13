import jwt from 'jsonwebtoken'

export const VerifyToken=(req,res,next)=>{
    const authHeader =req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null)return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403)
        req.email=decoded.email
        next()
    })
}

export const verifyResetPassword=(req,res,next)=>{
    const token=req.params.token
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.json({msg:"Not Auth"})
        req.email=decoded.email
        next()
    })
}
export const verifyLinkReset=(req,res,next)=>{
    const token=req.params.token
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.json({msg:"Not Auth"})
        req.email=decoded.email
        res.json({msg:"Auth"})
    })
}

