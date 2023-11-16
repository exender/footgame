import express from 'express';

import { payment, successPayment } from '../controllers/payment';

const router = express.Router();

router.post("/payment", payment);
router.get("/success", successPayment);

export { router as paymentRoutes }
