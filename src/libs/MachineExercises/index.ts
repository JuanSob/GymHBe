import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { MachineExerDao } from "@server/dao/models/mongodb/MachineExercisesDao";
export interface MachineExer {
    name: string;
    description:string;
    imagePath: string;
    _id?:unknown;
  };

export class MachineExercises {
    private dao: MachineExerDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new MachineExerDao(conn);
			})
			.catch(ex => console.error(ex));
	}

    /*public getMachineExercises() {
        return this.dao.getMachineExercises()
    }
    */

    public getMachineExercisesById( index:string) {
        return this.dao.getMachineExercisesById(index);
      }

    public getGymMachineByUserPaged(page: number, items: number) {
		return this.dao.getGymMachineByUserPaged(page, items);
	  }

    /*public async createMachineExercises(name: string, description: string, imagePath: string){
        const newMachine = {
            name, 
            description, 
            imagePath
        }
        return await this.dao.createMachineExercises(newMachine);
    }*/

    public async createMachineExercises(name: string, description: string, imagePath: string) {    
        try {        
            return this.dao.createMachineExercises(
                {
                    name,
                    description,
                    imagePath,
                }, 
            )
        }
        catch (err) {
            console.log("error", err);
            throw err;
        }
    }

    public updateMachineExercises( index:number|string, exercisesMachine:MachineExer){
        return (this.dao as MachineExerDao).updateMachineExercises({...exercisesMachine, _id:index});
    }

    public deleteMachineExercises( index:string) {
        return this.dao.deleteMachineExercises({_id: index})
    }
}