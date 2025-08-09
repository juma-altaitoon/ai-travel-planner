import express from "express";
import testimonial from "../controllers/testimonialController";

const testimonialRouter = express.Router();

// User Route
testimonialRouter.post("/send", testimonial.postTestimonial);

// Admin Routes
testimonialRouter.get("/", testimonial.getAllTestimonials);
testimonialRouter.put("/update", testimonial.updateTestimonial);
testimonialRouter.post("/delete", testimonial.deleteTestimonial);