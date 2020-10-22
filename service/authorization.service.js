module.exports = class AuthorizationService {

    constructor(userModel) {
        this.userModel = userModel;
    }

    async login(email, password) {
        const user = await this.userModel.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({
                error: 'Login failed! Check authentication credentials'
            })
        }
        const token = await user.generateAuthToken()
        return {
            user,
            token
        };
    }

    async logout(user, tokenCurrent) {
        user.tokens = user.tokens.filter((token) => {
            return token.token != tokenCurrent
        })
        await user.save()
        return {
            user
        };
    }

    async logoutAll(user) {
        user.tokens.splice(0, user.tokens.length)
        await user.save()
        return {
            user
        };
    }
}