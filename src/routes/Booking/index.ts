import { Router} from 'express';
import { Booking } from "@server/libs/Booking";
import { WithUserRequest } from '@routes/index';
const router = Router();
const booking = new Booking();

router.post('/newBooking', async (req: WithUserRequest, res) => {
    try {
       // const  userId  = "63855a372e5acf3f673830fa";
       const {_id:userId } = req.user;
       // const  userId= req.user;
        const newBooking = req.body ;

        const newBookingIndex = await booking.insertNewBooking(newBooking, userId);
        res.json({ newIndex: newBookingIndex });
    }
    catch (ex) {
        res.status(500).json({error: (ex as Error).message});
    }
});

export default router;