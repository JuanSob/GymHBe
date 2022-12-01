import express from "express";
const router = express.Router()
import { GymPlanPayment } from "@server/libs/GymPlanPayment";
import { WithUserRequest } from '@routes/index';

const gymPlanPayment = new GymPlanPayment();

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