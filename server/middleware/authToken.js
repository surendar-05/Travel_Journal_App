const express=require('express');
const jwt=require('jsonwebtoken');


const authToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token)
    {
        return res.status(403).send('Token is required');
    }
    jwt.verify(token,'',(err,decoded)=>{
        if(err)
        {
            return res.status(401).send('Invalid Token');
        }
        req.userId=decoded.id;
        next();
    })
}

module.exports = authToken;