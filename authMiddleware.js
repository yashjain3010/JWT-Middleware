const jwt = require('jsonwebtoken');
const {hasPermission} = require('./rolePermissions');

const SUPERADMIN_ADMIN_SECRET = "helloworld"
const BACKEND_SYSTEM_SECRET = "jwtsecret123"

function authenticationToken(requiredPermission){
    return (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            msg: "No token is provided"
        })
    }

    //Here we decode the token to find it type
    const decodedToken = jwt.decode(token,{complete: true});

    if(!decodedToken){
        return res.status(400).json({
            msg : "Invalid token"
        })
    }

    //Now we will check the payload of the token to identify who will be try to login

    const {tokenIssuer,role} = decodedToken.payload;

    //Here we check that tokenIssuer is of Superadmin/admin or not
    if(tokenIssuer === 'superadmin-admin-issuer'){
        jwt.verify(token,SUPERADMIN_ADMIN_SECRET,(err,user) => {
            if(err) return res.status(403).json({
                msg : "Invalid superadmin/admin token"
            })

            //If role is not matched

            if(!hasPermission(role,requiredPermission)){
                return res.status(403).json({
                    msg: "Access denied: Insufficient permission"
                })
            }

            req.user = user;
            next();
        })
    }

    else if(tokenIssuer === 'backend-system-issuer'){
        jwt.verify(token,BACKEND_SYSTEM_SECRET,(err,user) => {
            if(err) return res.status(403).json({
                msg: "Invalid Backend System token"
            })

            if(!hasPermission(role,requiredPermission)){
                return res.status(403).json({
                   msg : "Access denied: Insufficent permission"
                })
            }

            req.system = system;
            next();
        })
    }

    else{
        return res.status(403).json({
            msg: "Unknown token issuer"
        })
    }
  }
}

module.exports = authenticationToken

