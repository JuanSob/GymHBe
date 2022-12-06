import { IGymTrainings } from '../entities/GymTrainings';
import { AbstractDao } from './AbstractDao';
import { Db} from 'mongodb';

export class GymTrainingsDao extends AbstractDao<IGymTrainings>{
    public constructor(db:Db){
        super('GymTrainings', db);
    }
    /*
    public getGymTrainings(){
        return super.findAll()
    }
    */

    public async getGymTrainingsById( identifier : string ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("GymTrainingsDao mongodb:", (ex as Error).message);
        throw ex;
      }
    }

    public async getGymTrainingByUserPaged(page:number=1, itemsPerPage: number=10){
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
        console.log("GymTrainingsDao  mongodb:", (ex as Error).message);
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