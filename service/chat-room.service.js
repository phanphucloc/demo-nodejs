module.exports = class ChatRoomService {

    constructor(ChatRoomModel) {
        this.ChatRoomModel = ChatRoomModel;
    }

    async createChatRoom(chatRoomData, idUserCurrent) {
        
        try {
            chatRoomData.createDate = new Date();
        chatRoomData.numberOnline = 0;
        chatRoomData.ownRoomId = idUserCurrent;
        
        console.log(chatRoomData);

        const chatRoom = new this.ChatRoomModel(chatRoomData)
        await chatRoom.save()
        return {
            chatRoom,
        };
        } catch (error) {
            console.log(error);
        }
        
    }

    async editChatRoom(id, chatRoomData) {

        let newChatRoomData = {};

        chatRoomData.nameRoom ? newChatRoomData.nameRoom = chatRoomData.nameRoom : newChatRoomData;
        chatRoomData.description ? newChatRoomData.description = chatRoomData.description : newChatRoomData;

        await this.ChatRoomModel.updateOne({
            _id: id
        }, newChatRoomData);

        return {
            user: {
                _id: id,
                ...newChatRoomData
            }
        };
    }

    async getChatRoomById(id) {
        const chatRoom = await this.ChatRoomModel.findOne({
            _id: id
        });
        return {
            chatRoom,
        };
    }

    async getAllChatRoom() {
        const chatRooms = await (
            this.ChatRoomModel
            .aggregate([{
                    $lookup: {
                        from: "usermodels",
                        localField: "ownRoomId",
                        foreignField: "_id",
                        as: "User"
                    },
                },
                {
                    $unwind: "$User"
                },
                {
                    $project: {
                        nameRoom: 1,
                        createDate: 1,
                        ownRoomId: 1,
                        numberOnline: 1,
                        description: 1,
                        ownRoomName: {
                            $concat: ["$User.lastName", " ", "$User.firstName"]
                        }
                    }
                }
            ]) || []
        );
        console.log(chatRooms);
        return {
            chatRooms,
        };
    }

    async deleteChatRooms(ids) {
        console.log('listIDs', ids)

        await this.ChatRoomModel.deleteMany({
            _id: {
                $in: ids
              }
        });
        console.log('listIDss', ids)

        return {
            status: 'OK',
            message: 'Delete success'
        };
    }
}