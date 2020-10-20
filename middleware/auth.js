const jwt = require('jsonwebtoken')
const Person = require('../models/person')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.Authorization?.replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const person = await Person.findOne({ _id: data._id, 'tokens.token': token });
        if (!person) {
            throw new Error()
        }
        req.person = person;
        req.token = token;
        next()
    } catch (error) {
        if(req.method === 'GET'){
            res.redirect('/login');
        }
        else{
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    }

}
module.exports = auth