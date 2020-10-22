module.exports = class PersonService {

    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async createPerson(userData) {
        const user = new this.UserModel(userData)
        await user.save()
        const token = await user.generateAuthToken()
        return {
            user,
            token
        };
    }

    async editPerson(id, userData) {
        await this.UserModel.updateOne({
            _id: id
        }, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address
        }, );


        return {
            user: {
                _id: id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address
            }
        };
    }

    async getPersonById(id) {
        const user = await this.UserModel.findOne({
            _id: id
        });
        return {
            user,
        };
    }

    async getAllPerson() {
        const users = await this.UserModel.find();
        return {
            users,
        };
    }

    async deletePerson(id) {
        await this.UserModel.deleteOne({
            _id: id
        });
        return {
            status: 'OK',
            message: 'Delete success'
        };
    }
}