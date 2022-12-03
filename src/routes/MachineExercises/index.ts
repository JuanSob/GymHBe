import express from "express";
const router = express.Router();
import { MachineExercises, MachineExer} from "@server/libs/MachineExercises";

const machineExercises = new MachineExercises();

/*router.get('/', async (_req, res)=>{
    try {
      res.json(await machineExercises.getMachineExercises());
    } catch (ex) {
      console.error(ex);
      res.status(503).json({error:ex});
    }
  });
*/
router.get('/', async (req, res) => {
  try {
    const { page, items } = { page: "1", items: "10", ...req.query };
    res.json(await machineExercises.getGymMachineByUserPaged(Number(page), Number(items)));
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

router.get('/byMachineIndex/:index', async (req, res) => {
    try {
      const { index : id } = req.params;
      res.json(await machineExercises.getMachineExercisesById(id));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al obtener Registro'});
    }
  });

router.post('/createMachine', (req, res) => {
  try{
      const {name, description} = req.body;
      const imagePath = req.file.path;
      res.status(200).json({'msg':'La maquina de ejercicio se ha ingresado de manera correcta'});
      console.log(req.file.path);
      const result = machineExercises.createMachineExercises(name, description,imagePath);
      console.log('GYMTRAININGS', result);
  }catch(ex)
  {
      res.status(500).json({error:"Error al ingresar el entrenamiento"});
      console.log("GYMTRAININGS:", ex);
  }
});

router.put('/updateMachine/:index', async (req, res)=>{
    try {
      const { index : id } = req.params;
      const exerciseFlowFromForm = req.body as MachineExer;
      await machineExercises.updateMachineExercises(id, exerciseFlowFromForm);
      res.status(200).json({"msg":"Registro Actualizado"});
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.delete('/deleteMachine/:index', (req, res)=>{
    try {
      const { index : id } = req.params;
      if (machineExercises.deleteMachineExercises(id)) {
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
