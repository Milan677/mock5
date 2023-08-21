const jwt = require("jsonwebtoken");

const { userModel } = require("../models/user")
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if(token){
            const decodedToken = jwt.verify(token, "masai");
            const { userID } = decodedToken;
            // Check if the user exists
            const user = await userModel.findById(userID);
            console.log(user)
            if (!user) {
                return res.status(401).json({ message: 'pls login' });
            }
            // Attach the user to the request object
            req.user = user;
            next();
        }else{
            res.status(401).json({ message: 'pls login 1' });
        }
      
      
    } catch (error) {
        res.status(401).json({ message: 'pls login 2' });
        console.log(error)
    }
}
module.exports = { authenticate }