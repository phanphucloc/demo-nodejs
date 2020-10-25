const express = require('express')
const AuthorizationService = require('../service/authorization.service')
const {
    system,
    TYPE_REQUEST
} = require('../config/index');
const UserModel = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()
const authorizationServiceInstance = new AuthorizationService(UserModel);

// POST: Login
router.post(system.BASE_URL_API + 'authorization/login', async (req, res) => {
    try {

        const { email , password } = req.body

        const data = await authorizationServiceInstance.login(email, password);
        res.send(data)

    } catch (error) {
        res.status(400).send(error)
    }
});

// POST: Log user out of the application
router.post(system.BASE_URL_API + 'authorization/logout', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        console.log('token :: ',req.token);
        const data = await authorizationServiceInstance.logout(req.user, req.token);
        res.send(data);
    } catch (error) {
        res.status(500).send(error)
    }
})

// POST: Log user out of all devices
router.post(system.BASE_URL_API + 'authorization/logout-all', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const data = await authorizationServiceInstance.logoutAll(req.user);
        res.send(data);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router