import express from 'express';
import itinerary from '../controllers/itineraryController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const itineraryRouter = express.Router();

// Protected routes
itineraryRouter.get('/', authenticate, itinerary.getItineraries);
itineraryRouter.post('/id', authenticate, itinerary.getItineraryById);
itineraryRouter.get('/test', itinerary.generateTest);
itineraryRouter.post('/generate', authenticate, itinerary.generateItinerary);
itineraryRouter.post('/save', authenticate, itinerary.saveItinerary);
itineraryRouter.post('/delete', authenticate, itinerary.deleteItinerary);


export default itineraryRouter;