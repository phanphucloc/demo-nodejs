
const noAuth = async(req, res, next) => {
    try {
        const token = req.cookies.Authorization;
        if(!!token){
            throw new Error()
        }
        else{
            next();
        }
    } catch (error) {
        if(req.method === 'GET'){
            res.redirect('/');
        }
        else{
            res.status(401).send({ error: 'You are already logged in, cannot access this page!' });
        }
    }

}
module.exports = noAuth