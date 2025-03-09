import {listContacts, getContactById, removeContact, addContact, updateContactById, updateStatusContact} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    try {
        const userId = req.user.dataValues.id;
        const contacts = await listContacts(userId);
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error with get contacts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOneContact = async (req, res) => {
    try {
        const userId = req.user.dataValues.id;
        const { id } = req.params;
        const contact = await getContactById(id, userId);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error("Error fetching contact by Id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const userId = req.user.dataValues.id;
        const { id } = req.params;
        const removedContact = await removeContact(id, userId);
        if (removedContact) {
            res.status(200).json(removedContact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createContact = async (req, res) => {
    try {
        const userId = req.user.dataValues.id;
        const newContact = await addContact(
            req.body.name,
            req.body.email,
            req.body.phone,
            userId
        );
        res.status(201).json(newContact);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateContact = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Body must have at least one field" });
        }

        const userId = req.user.dataValues.id;
        const { id } = req.params;
        const updatedContact = await updateContactById(id, userId, req.body);
        if (updatedContact) {
            res.status(200).json(updatedContact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateFavorite(req, res) {
    const userId = req.user.dataValues.id;
    const { id } = req.params;
    const { favorite } = req.body;

    const updatedContact = await updateStatusContact(id, userId, favorite);

    if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(updatedContact);
}