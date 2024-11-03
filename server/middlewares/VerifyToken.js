import jwt from 'jsonwebtoken';

const verifyToken=(req, res, next)=>{
    if(!req.headers.authorization) return res.status(403).json({msg:'Unauthorized'});

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET,(err,data)=>{
            if(err)return res.status(403).json({msg:'Token is expired'});
            else{
                req.user=data;
                next();
            }
        })
    }
}

export default verifyToken;