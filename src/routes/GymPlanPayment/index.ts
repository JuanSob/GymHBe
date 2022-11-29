import express from "express";
const router = express.Router()
import { GymPlanPayment } from "@server/libs/GymPlanPayment";
import { WithUserRequest } from '@routes/index';

const gymPlanPayment = new GymPlanPayment();
const stripe = require('stripe')(process.env.Sprite_Private_Key);

router.post('/releasePayment', async (req: WithUserRequest, res) => {
	try {
		const { _id: userId } = req.user;
		const newPayment = req.body;

		const newPaymentIndex = await gymPlanPayment.addNewPayment(newPayment, userId);
		res.json({ newIndex: newPaymentIndex });
	}
	catch (ex) {
		res.status(402).json({ error: "Error making payment request" });
		console.error("Payment Release:", ex);
	}
})

router.post('/releasePayments', async (_req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'subscription',
			succes_url: `${process.env.SERVER_URL}/payments`,
			cancel_url: `${process.env.SERVER_URL}/payments`
		})
		res.json({ url: session.url });
	}
	catch (ex) {
		res.status(402).json({ error: "Error making payment request" });
		console.error("Payment Release:", ex);
	}
})

router.get('/lastPayment', async (req: WithUserRequest, res) => {
	try {
		console.log("Last Payment", req.user);
		res.json(await gymPlanPayment.getPaymentByUser(req.user?._id));
	} catch (ex) {
		console.error(ex);
		res.status(503).json({ error: ex });
	}
});


export default router;