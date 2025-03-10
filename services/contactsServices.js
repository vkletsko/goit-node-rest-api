import contactsRepository from "../repositories/contactsRepository.js";

export async function listContacts(userId) {
    try {
        return await contactsRepository.getAll(userId);
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function getContactById(contactId, userId) {
    try {
        return await contactsRepository.getById(contactId, userId);
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function addContact(name, email, phone, userId) {
    try {
        return await contactsRepository.create({name, email, phone, userId});
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function updateContactById(contactId, userId, updatedData) {
    try {
        return await contactsRepository.update(contactId, userId, updatedData);
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function removeContact(contactId, userId) {
    try {
        return await contactsRepository.remove(contactId, userId);
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function updateStatusContact(contactId, userId, favoriteValue) {
    try {
        return await contactsRepository.updateFavorite(contactId, userId, favoriteValue);
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}