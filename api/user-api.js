const express = require('express')
const { system , TYPE_REQUEST } = require('../config/index');
const Person = require('../models/person')
const auth = require('../middleware/auth')

const router = express.Router()

router.post(system.BASE_URL_API + 'user' , auth(TYPE_REQUEST.API) , async (req, res) => {
    // Create a new user
    try {
        const person = new Person(req.body)
        await person.save()
        const token = await person.generateAuthToken()
        res.status(201).send({ person, token })
    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
})

router.post(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
    // Edit a new user
    try {
        await Person.update(
            {
                _id: req.params.id
            }, 
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            },
        );

        res.status(201).send({ person })

    } catch (error) {
        res.status(400).send(error)
    }
})


router.get(system.BASE_URL_API + 'users', auth(TYPE_REQUEST.API) , async (req, res) => {
    // get all user
    try {
        const person = await Person.find();
        res.status(201).send({ person })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get(system.BASE_URL_API + 'user/:id' , auth(TYPE_REQUEST.API) , async (req, res) => {
    // get user by Id
    try {
        const person = await Person.findOne({_id: req.params.id});
        res.status(201).send({ person })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete(system.BASE_URL_API + 'user/:id', auth(TYPE_REQUEST.API) , async (req, res) => {
    // delete user by Id
    try {
        await Person.deleteOne({_id: req.params.id});
        res.status(201).send({
            status: 'OK',
            message: 'Create success'
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router