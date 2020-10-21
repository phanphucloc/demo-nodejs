
const express = require('express')
const AuthorizationService = require('../service/authorization.service')
const { system , TYPE_REQUEST } = require('../config/index');
const Person = require('../models/person')
const auth = require('../middleware/auth')
const router = express.Router()
const authorizationServiceInstance = new AuthorizationService(Person);

router.post(system.BASE_URL_API + 'authorization/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const data = await authorizationServiceInstance.login(email, password);
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post(system.BASE_URL_API + 'authorization/logout', auth(TYPE_REQUEST.API) , async (req, res) => {
    // Log user out of the application
    try {
        const data = await authorizationServiceInstance.logout(req.person,req.token);
        res.send(data);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post(system.BASE_URL_API + 'authorization/logout-all', auth(TYPE_REQUEST.API) , async(req, res) => {
    // Log user out of all devices
    try {
        const data = await authorizationServiceInstance.logoutAll(req.person);
        res.send(data);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router