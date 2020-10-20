module.exports = class AuthorizationService {

    constructor(personModel) {
        this.personModel = personModel;
    }

    async login(email, password) {
        const person = await this.personModel.findByCredentials(email, password)
        if (!person) {
            return res.status(401).send({
                error: 'Login failed! Check authentication credentials'
            })
        }
        const token = await person.generateAuthToken()
        return {
            person,
            token
        };
    }

    async logout(person, tokenCurrent) {
        person.tokens = person.tokens.filter((token) => {
            return token.token != tokenCurrent
        })
        await person.save()
        return {
            person
        };
    }

    async logoutAll(person) {
        person.tokens.splice(0, person.tokens.length)
        await person.save()
        return {
            person
        };
    }
}