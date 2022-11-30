import { IGymTrainings } from '../entities/GymTrainings';
import { AbstractDao } from './AbstractDao';
import { Db} from 'mongodb';

export class GymTrainingsDao extends AbstractDao<IGymTrainings>{
    public constructor(db:Db){
        super('GymTrainings', db);
    }
    public getGymTrainings(){
        return super.findAll()
    }

    public async getGymTrainingsById( identifier : string ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("GymTrainingsDao mongodb:", (ex as Error).message);
        throw ex;
      }
    }

    createGymTrainings(training: IGymTrainings){
        const {_id, ...newTraining } = training;
        return this.createOne(newTraining);
    }

    public async updateGymTrainings( updateGymTrainings: IGymTrainings) {
        try {
          const {_id, ...updateTraining} = updateGymTrainings;
          const result = await super.update(_id as string, updateTraining);
          return result;
        } catch( ex: unknown) {
          console.log("GymTrainingsDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }

      public async deleteGymTrainings( deleteGymTrainings: Partial<IGymTrainings>) {
        try {
          const {_id } = deleteGymTrainings;
          const result = await super.delete(_id as string);
          return result;
        } catch( ex: unknown) {
          console.log("GymTrainingsDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }

}