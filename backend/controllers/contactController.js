import Contact from "../models/Contact";

const newMessage = async (req, res) => {
    const { name, email, message } = req.body
    try {
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        return res.status(200).json({ message: "Message sent!" });    
    } catch (error) {
        console.error("Failed to send message: ", error);
        return res.status(500).json({ message: "Server Error!", error: error.message });
    }
};

const getAllMessages = async (req, res) => {
    const {page = 1, limit = 20 } = req.query;
    
    try {
        const messages = await Contact.find().sort({ createdAt: -1}).skip(page -1 * limit).limit(Number(limit));
        const total = await Contact.countDocuments();
        res.status(200).json({ messages, total });
    } catch (error) {
        console.error("Error loading contact messages: ", error);
        return res.status(500).json({ message: "Server Error!", error: error.message });
    }
};

const readMessage = async(req, res) => {
    const { id } = req.body;
    try {
        const updatedMessage = await Contact.findByIdAndUpdate(id, { read: true });
        return res.status(200).json({ message: "Message Read" });
    } catch (error) {
        console.error("Error loading contact messages: ", error);
        return res.status(500).json({ message: "Server Error!", error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedMsg = await Contact.findByIdAndDelete(id);
        return res.status(200).json({ message: "Message Deleted" });
    } catch (error) {
        console.error("Error deleting contact message: ", error);
        return res.status(500).json({ message: "Server Error!", error: error.message });
    }
};



export default { newMessage, getAllMessages, readMessage, deleteMessage };