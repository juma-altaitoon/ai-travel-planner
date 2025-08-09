import Testimonial from "../models/Testimonial";
import User from "../models/User";

const postTestimonial = async (req, res) => {
    const user = req.user;
    const { quote, rating, destination } = req.body;

    try {
        const userInfo = await User.findById(user).select(["username", "avatar"]);
        const name = userInfo.username;
        const avatar = userInfo.avatar || null;
        const newEntry = await Testimonial.create({ quote, user, username, avatar, rating, destination })
        return res.status(201).json({ message: "Thank you for your review!", newEntry });
    } catch (error) {
        console.error("Error saving testimonial: ", error);
        return res.status(500).json({ message: "Server Error.", error: error.message });
    }
};

const getAllTestimonials = async (req, res) => {
    const {page = 1, limit = 20 } = req.query;
    try {
        const testimonials = await Testimonial.find().select("-user").sort({ createdAt: -1}).skip(page -1 * limit).limit(Number(limit));
        const total = await Testimonial.countDocuments();
        return res.status(200).json(testimonials, total);
    } catch (error) {
        console.error("Error Loading Testimonials: ", error);
        return res.status(500).json({ message: "Server Error!", error: error.message });
    }
}

const updateTestimonial = async (req, res) => {
    const { id, publish } = req.body;
    try {
        const updateTestimonial = await Testimonial.findByIdAndUpdate(id, { publish });

        return res.status(200).json({ message: "Testimonial Status Updated!" });        
    } catch (error) {
        console.error("Error updating testimonial status: ", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteTestimonial = async(req, res) => {
    const id = req.body;
    try {
        await Testimonial.findByIdAndDelete(id);
        return res.status(200).json("Testimonial deleted");
    } catch (error) {
        console.error("Error deleting testimonial: ", error);
        res.status(500).json({ message: "Server Error!", error: error.message });
    }
};


export default { postTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial };
