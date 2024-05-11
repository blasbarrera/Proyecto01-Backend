const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, usuario) => {
        if(err) return res.sendStatus(403);
        req.usuario = usuario;
        next();
    });
}

module.exports = authenticateToken;