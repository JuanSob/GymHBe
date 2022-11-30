import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { GymTrainingsDao } from "@server/dao/models/mongodb/GymTrainingsDao";
export interface IGymTrainings {
    name: string;
    description:string;
    imagePath: string;
    clases: [];
    _id?:unknown;
}

export class GymTrainings {
    private dao: GymTrainingsDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new GymTrainingsDao(conn);
			})
			.catch(ex => console.error(ex));
	}

    public getGymTrainings() {
        return this.dao.getGymTrainings()
      }

    public getGymTrainingsById( index:string) {
        return this.dao.getGymTrainingsById(index);
      }

   /* public async createGymTrainings(name: string, description: string, imagePath: string, clases: [] ){
        const newTraining = {
            name, 
            description, 
            imagePath,
            clases
        }
        return await this.dao.createGymTrainings(newTraining);
    }
    */
   
   public async createGymTrainings(name: string, description: string, imagePath: string, clases: [] ) {    
        try {        
            return this.dao.createGymTrainings(
                {
                    name,
                    description,
                    imagePath,
                    clases
                }, 
            )
        }
        catch (err) {
            console.log("error", err);
            throw err;
        }
    }

    public updateGymTrainings( index:number|string, gymTraining: IGymTrainings){
        return (this.dao as GymTrainingsDao).updateGymTrainings({...gymTraining, _id:index});
    }

    public deleteGymTrainings( index:string) {
        return this.dao.deleteGymTrainings({_id: index})
    }
}

