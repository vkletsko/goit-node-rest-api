import User from "../db/models/User.js";

class UsersRepository {

    async getByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getById(id) {
        return await User.findOne( { where: { id } });
    }

    async create(email, password) {
        return await User.create({ email, password });
    }
}

const usersRepository = new UsersRepository();
export default usersRepository;