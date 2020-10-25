const express = require('express')
const { system , TYPE_REQUEST } = require('../config/index');
const UserModel = require('../models/user')
const auth = require('../middleware/auth')

const PersonService = require('../service/user.service')
const userServiceInstance = new PersonService(UserModel);

const router = express.Router()

// POST: Create  a new user
router.post(system.BASE_URL_API + 'user' , auth(TYPE_REQUEST.API) , async (req, res) => {
    try {
        const { user, token } = await userServiceInstance.createPerson(req.body)
        res.status(201).send({ user, token })
    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
})

// POST: Edit user by id
router.post(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
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

// GET: Get all user
router.get(system.BASE_URL_API + 'users', auth(TYPE_REQUEST.API) , async (req, res) => {
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

// GET: Get user by Id user by id
router.get(system.BASE_URL_API + 'user/:id' , auth(TYPE_REQUEST.API) , async (req, res) => {
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

// DELETE: Delete user by id
router.delete(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
    try {
        const { status , message } = await userServiceInstance.deletePerson(req.params.id);
        res.status(201).send({
            status,
            message
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router