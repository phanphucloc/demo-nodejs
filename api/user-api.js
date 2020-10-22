const express = require('express')
const { system , TYPE_REQUEST } = require('../config/index');
const UserModel = require('../models/user')
const auth = require('../middleware/auth')

const PersonService = require('../service/user.service')
const userServiceInstance = new PersonService(UserModel);

const router = express.Router()

router.post(system.BASE_URL_API + 'user' , auth(TYPE_REQUEST.API) , async (req, res) => {
    // Create a new user
    try {
        const { user, token } = await userServiceInstance.createPerson(req.body)
        res.status(201).send({ user, token })
    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
})

router.post(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
    // Edit a new user
    try {
        const { user } = await userServiceInstance.editPerson(req.params.id,req.body);
        res.status(201).send({ 
            status: 'OK',
            message: 'Edit success',
            user 
        })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get(system.BASE_URL_API + 'users', auth(TYPE_REQUEST.API) , async (req, res) => {
    // get all user
    try {
        const { users } = await userServiceInstance.getAllPerson();
        res.status(201).send({
            status: 'OK',
            message: 'get users success', 
            users 
        })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get(system.BASE_URL_API + 'user/:id' , auth(TYPE_REQUEST.API) , async (req, res) => {
    // get user by Id
    try {
        const { user } = await userServiceInstance.getPersonById(req.params.id);
        res.status(201).send({ 
            status: 'OK',
            message: 'get user by id success', 
            user 
        })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
    // delete user by Id
    try {
        const { status , message } = await userServiceInstance.deletePerson(req.params.id);
        res.status(201).send({
            status: 'OK',
            message: 'Create success'
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router