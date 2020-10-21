const {TYPE_REQUEST} = require('../config/index')

const noAuth = (typeRequest) => {

    return  async function (req, res, next) {
        try {
            const token = req.cookies.Authorization;
            if(!!token){
                throw new Error()
            }
            else{
                next();
            }
        } catch (error) {
            if(typeRequest === TYPE_REQUEST.VIEW){
                res.redirect('/');
            }
            else{
                res.status(401).send({ error: 'You are already logged in, cannot access this page!' });
            }
        }
    }

}
module.exports = noAuth