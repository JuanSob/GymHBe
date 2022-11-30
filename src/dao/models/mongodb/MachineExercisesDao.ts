import { MachineExer } from '../entities/MachineExercises';
import { AbstractDao } from './AbstractDao';
import { Db} from 'mongodb';

export class MachineExerDao extends AbstractDao<MachineExer>{
    public constructor(db:Db){
        super('MachineExercises', db);
    }
    public getMachineExercises(){
        return super.findAll()
    }

    public async getMachineExercisesById( identifier : string ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("MachineExercisesDao mongodb:", (ex as Error).message);
        throw ex;
      }
    }

    createMachineExercises(machine: MachineExer){
        const {_id, ...newMachine } = machine;
        return this.createOne(newMachine);
    }

    public async updateMachineExercises( updateMachineExercises: MachineExer) {
        try {
          const {_id, ...updateMachine} = updateMachineExercises;
          const result = await super.update(_id as string, updateMachine);
          return result;
        } catch( ex: unknown) {
          console.log("MachineExercisesDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }

      public async deleteMachineExercises( deleteMachineExercises: Partial<MachineExer>) {
        try {
          const {_id } = deleteMachineExercises;
          const result = await super.delete(_id as string);
          return result;
        } catch( ex: unknown) {
          console.log("MachineExercisesDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }


}