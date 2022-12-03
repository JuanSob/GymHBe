import express from "express";
const router = express.Router();
import { GymTrainings, IGymTrainings} from "@server/libs/GymTrainings";

const gymTrainings = new GymTrainings();

/*router.get('/', async (_req, res)=>{
    try {
      res.json(await gymTrainings.getGymTrainings());
    } catch (ex) {
      console.error(ex);
      res.status(503).json({error:ex});
    }
  });
*/
router.get('/', async (req, res) => {
  try {
    const { page, items } = { page: "1", items: "10", ...req.query };
    res.json(await gymTrainings.getGymTrainingByUserPaged(Number(page), Number(items)));
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

router.get('/byTrainingIndex/:index', async (req, res) => {
    try {
      const { index : id } = req.params;
      res.json(await gymTrainings.getGymTrainingsById(id));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al obtener Registro'});
    }
  });

router.post('/createTraining', (req, res) => {
    try{
        const {name, description,clases} = req.body;
        const imagePath = req.file.path;
        res.status(200).json({'msg':'El entrenamiento se ha ingresado de manera correcta'});
        console.log(req.file.path);
        const result = gymTrainings.createGymTrainings(name, description,imagePath,clases);
        console.log('GYMTRAININGS', result);
    }catch(ex)
    {
        res.status(500).json({error:"Error al ingresar el entrenamiento"});
        console.log("GYMTRAININGS:", ex);
    }
});


router.put('/updateTraining/:index', async (req, res)=>{
    try {
      const { index : id } = req.params;
      const trainingFlowFromForm = req.body as IGymTrainings;
      await gymTrainings.updateGymTrainings(id, trainingFlowFromForm);
      res.status(200).json({"msg":"Registro Actualizado"});
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.delete('/deleteTraining/:index', (req, res)=>{
    try {
      const { index : id } = req.params;
      if (gymTrainings.deleteGymTrainings(id)) {
        res.status(200).json({"msg": "Registro Eliminado"});
      } else {
        res.status(500).json({'msg': 'Error al eliminar Registro'});
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  });

  
export default router;