
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
        res.redirect('/');
    }

}
module.exports = noAuth