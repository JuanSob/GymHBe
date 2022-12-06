import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { RutinasDao } from "@server/dao/models/mongodb/RutinasDao";
export interface Rutina{
    enfoque: string;
    descripcion: string;
    imagePath: string;
    _id?: unknown;
}

export class Rutina {
    private dao: RutinasDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new RutinasDao(conn);
			})
			.catch(ex => console.error(ex));
	}

    public getRutina() {
        return this.dao.getRutina()
      }

    public getRutinabyId( index:string) {
        return this.dao.getRutinabyId(index);
      }

      public getRutineByUserPaged(page: number, items: number) {
		return this.dao.getRutineByUserPaged(page, items);
	  }
    public async createRutina(enfoque: string, descripcion: string, imagePath: string){
        const newRutine = {
            enfoque, 
            descripcion, 
            imagePath
        }
        return await this.dao.createRutina(newRutine);
    }

    public updateRutina( index:number|string, rutina:Rutina){
        return (this.dao as RutinasDao).updateRutina({...rutina, _id:index});
    }

    public deleteRutina( index:string) {
        return this.dao.deleteRutina({_id: index})
    }
}