const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var { system } = require('../config/index');

const personSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

personSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

personSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    console.log(process.env);
    const token = jwt.sign({_id: user._id}, system.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

personSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await Person.findOne({ email} )
    console.log(user);
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person