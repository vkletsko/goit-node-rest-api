import contactsRepository from "../repositories/contactsRepository.js";

export async function listContacts(userId) {
    return await contactsRepository.getAll(userId);
}

export async function getContactById(contactId, userId) {
    return await contactsRepository.getById(contactId, userId);
}

export async function addContact(name, email, phone, userId) {
    return await contactsRepository.create({name, email, phone, userId});
}

export async function updateContactById(contactId, userId, updatedData) {
    return await contactsRepository.update(contactId, userId, updatedData);
}

export async function removeContact(contactId, userId) {
    return await contactsRepository.remove(contactId, userId);
}

export async function updateStatusContact(contactId, userId, favoriteValue) {
    return await contactsRepository.updateFavorite(contactId, userId, favoriteValue);
}