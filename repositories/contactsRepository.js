import Contact from "../db/models/Contact.js";

class ContactsRepository {
    async getAll(userId) {
        return await Contact.findAll({ where: { owner: userId }});
    }

    async getById(contactId, userId) {
        return await Contact.findOne({ where: { owner: userId, id: contactId } });
    }

    async create({name, email, phone, userId}) {
        return await Contact.create({ name, email, phone, owner: userId });
    }

    async update(contactId, userId, updatedData) {
        const [rowsUpdated, [updatedContact]] = await Contact.update(updatedData, {
            where: {owner: userId, id: contactId}, returning: true,
        });
        return rowsUpdated ? updatedContact : null;
    }

    async remove(contactId, userId) {
        const contact = await Contact.findOne({ where: { id: contactId, owner: userId } });
        if (!contact) return null;
        await contact.destroy();
        return contact;
    }

    async updateFavorite(contactId, userId, favoriteValue) {
        const [rowsUpdated, [updatedContact]] = await Contact.update({favorite: favoriteValue}, {
            where: {id: contactId, owner: userId}, returning: true
        });
        return rowsUpdated ? updatedContact : null;
    }
}

const contactsRepository = new ContactsRepository();
export default contactsRepository;