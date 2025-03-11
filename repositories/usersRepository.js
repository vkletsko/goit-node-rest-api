import User from "../db/models/User.js";

class UsersRepository {

    async getByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getById(id) {
        return await User.findOne( { where: { id } });
    }

    async create(email, password, avatarURL) {
        return await User.create({ email, password, avatarURL });
    }

    async updateAvatar(userId, avatarURL) {
        const [rowsUpdated, [updatedUser]] = await User.update({ avatarURL }, {
            where: {id: userId}, returning: true
        });
        return rowsUpdated ? updatedUser : null;
    }
}

const usersRepository = new UsersRepository();
export default usersRepository;