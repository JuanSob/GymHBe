import express from "express";
const router = express.Router();
import { GymPlans } from "@server/libs/GymPlans";

const gymPlan = new GymPlans();

router.post('/createPlan', (req, res) => {
    try{
        const {name, description, price, beneffits} = req.body;
        const result = gymPlan.createGymPlan(name, description, price, beneffits);
        res.status(200).json({'msg':'El plan se ha creado de manera correcta'});
        console.log('GYMPLAN', result);
    }catch(ex)
    {
        res.status(500).json({error:"Error al crear el plan"});
        console.log("GYMPLAN:", ex);
    }
});

export default router;