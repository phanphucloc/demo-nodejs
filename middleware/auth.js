const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const {
    TYPE_REQUEST
} = require('../config/index')

const auth =  (typeRequest) => {

    return  async function (req, res, next) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.Authorization?.replace('Bearer ', '');
            console.log('token:', token);
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await UserModel.findOne({
                _id: data._id,
                'tokens.token': token
            });
            if (!user) {
                throw new Error()
            }
            req.user = user;
            req.token = token;
            next()
        } catch (error) {
            if (typeRequest === TYPE_REQUEST.VIEW) {
                res.redirect('/login');
            } else {
                res.status(401).send({
                    error: 'Not authorized to access this resource',
                    status: 401
                })
            }
        }

    }
}
module.exports = auth