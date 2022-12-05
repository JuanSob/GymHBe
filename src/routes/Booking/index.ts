import { Router} from 'express';
import { Booking } from "@server/libs/Booking";
import { WithUserRequest } from '@routes/index';
const router = Router();
const booking = new Booking();

router.post('/newBooking', async (req: WithUserRequest, res)=>{
    try {
      const {_id: userId } = req.user;
      //const  userId  = "63855a372e5acf3f673830fa";
      const newBooking = req.body;

      const newBookingIndex = await booking.insertNewBooking(newBooking, userId);
      res.json({newIndex: newBookingIndex});
    } catch (error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.get('/byBookingIndex/:index', async (req, res) => {
    try {
      const { index : id } = req.params;
      res.json(await booking.getBookingById(id));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al obtener Registro'});
    }
  });

  router.delete('/deleteBooking/:index', async (req, res)=>{
    try {
      const { index : id } = req.params;
      await booking.deleteBooking(id);
      res.status(200).json({"msg": "Registro Eliminado"});
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });


  router.get('/', async (req: WithUserRequest, res)=>{
    try {
      const {page, items} = {page:"1", items:"10", ...req.query};
      console.log("Booking", req.user);
      res.json(await booking.getBookingByUserPaged(req.user?._id, Number(page), Number(items)));
    } catch (ex) {
      console.error(ex);
      res.status(503).json({error:ex});
    }
  });
export default router;