import Contact from "../models/Contact.js";

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

export default { newMessage };