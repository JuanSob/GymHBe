import express from "express";
const router = express.Router();
import { Rutina } from "@server/libs/Rutinas";

const rutinasEjercicio = new Rutina();

router.get('/', async (req, res) => {
  try {
    const { page, items } = { page: "1", items: "10", ...req.query };
    res.json(await rutinasEjercicio.getRutineByUserPaged(Number(page), Number(items)));
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

router.get('/byRutinaIndex/:index', async (req, res) => {
    try {
      const { index : id } = req.params;
      res.json(await rutinasEjercicio.getRutinabyId(id));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al obtener Registro'});
    }
  });

router.post('/createRutina', (req, res) => {
    try{
        const {enfoque, descripcion, imagePath} = req.body;
        const result = rutinasEjercicio.createRutina(enfoque, descripcion, imagePath);
        res.status(200).json({'msg':'La rutina ha sido ingresada correctamente'});
        console.log('Rutina', result);
    }catch(ex)
    {
        res.status(500).json({error:"Error al ingresar la rutina"});
        console.log("Rutina:", ex);
    }
});

router.put('/updateRutina/:index', async (req, res)=>{
    try {
      const { index : id } = req.params;
      const rutinaFlowFromForm = req.body as Rutina;
      await rutinasEjercicio.updateRutina(id, rutinaFlowFromForm);
      res.status(200).json({"msg":"Registro Actualizado"});
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.delete('/deleteRutina/:index', (req, res)=>{
    try {
      const { index : id } = req.params;
      if (rutinasEjercicio.deleteRutina(id)) {
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