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

        let newUserData;
        userData.firstName ?  newUserData.firstName = userData.firstName : newUserData;
        userData.lastName ?  newUserData.lastName = userData.lastName : newUserData;
        userData.address ?  newUserData.address = userData.address : newUserData;

        await this.UserModel.updateOne({ _id: id } , newUserData, );

        return {
            user: {
                _id: id,
                ...newUserData
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