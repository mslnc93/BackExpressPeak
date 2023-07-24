const  {sign, verify} = require('jsonwebtoken');

const createTokens = (user) =>{
    const accessToken = sign({pseudo : user.pseudo, mdp: user.mdp}, "SECRET")
    return accessToken;
}
const validateTokens = (req, res, next) =>{
    const accessToken = req.cookies['accessToken']
    console.log(accessToken);
    if(!accessToken) return res.status(400).json({error: "user not authentificated"});

    try {
        const validToken = verify(accessToken, "SECRET");
        if(validToken){
            req.authentificated = true;
            return next();
        }
    }
    catch (error){
        return res.status(400).json({error: error});
    }
}

module.exports = {createTokens, validateTokens};