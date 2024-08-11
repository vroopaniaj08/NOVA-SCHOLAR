const js = require('jsonwebtoken')

class jwt{
    generateToken(user_id,role_id){
        return js.sign({user_id,role_id},process.env.TOKEN_SECRET,{expiresIn:'30d'})
    }
    authenticatetoken(req,callback){
        let authtoken = req.headers['authorization']
        let token = authtoken && authtoken.split(' ')[1]
        if (token==null){
            callback({status:false,msg:"token missing"});
        }
        else{
            js.verify(token,process.env.TOKEN_SECRET,(err,token_data)=>{
                if(err){
                    callback({status:false,error:err.message})
                }
                else{
                    req.user_id = token_data.user_id;
                    req.role_id = token_data.role_id;
                    callback({status:true,msg:token_data})
                }
            })
        }
    }
}

module.exports = new jwt()