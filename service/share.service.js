module.exports = class ShareService {

    constructor() {
    }

    async convertListStringToString(listString = []) {
        return listString.join('/')
    }

}