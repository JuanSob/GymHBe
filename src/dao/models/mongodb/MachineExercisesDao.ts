import { MachineExer } from '../entities/MachineExercises';
import { AbstractDao } from './AbstractDao';
import { Db} from 'mongodb';

export class MachineExerDao extends AbstractDao<MachineExer>{
    public constructor(db:Db){
        super('MachineExercises', db);
    }
   
   /* public getMachineExercises(){
        return super.findAll()
    }
  */
    public async getMachineExercisesById( identifier : string ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("MachineExercisesDao mongodb:", (ex as Error).message);
        throw ex;
      }
    }

    public async getGymMachineByUserPaged(page:number=1, itemsPerPage: number=10){
      try{
        const total =  await super.getCollection().countDocuments({});
        const totalPages = Math.ceil(total/itemsPerPage);
        const items = await super.findByFilter(
                  {},
          { 
            sort:{'type':-1},
            skip:((page-1)*itemsPerPage),
            limit:itemsPerPage
          }
        );
        return {
          total,
          totalPages,
          page,
          itemsPerPage,
          items
        };
      }
      catch(ex)
      {
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