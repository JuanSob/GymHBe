import { Rutinas } from '../entities/Rutinas';
import { AbstractDao } from './AbstractDao';
import { Db } from 'mongodb';

export class RutinasDao extends AbstractDao<Rutinas>{
    public constructor(db:Db){
        super('Rutinas', db);
    }
    public getRutina(){
        return super.findAll()
    }

    public async getRutinabyId( identifier : string ){
      try{
        const result = await super.findByID(identifier);
        return result;
      } catch( ex: unknown) {
        console.log("Rutina mongodb:", (ex as Error).message);
        throw ex;
      }
    }

    createRutina(rutine: Rutinas){
        const {_id, ...newRutine } = rutine;
        return this.createOne(newRutine);
    }

    public async updateRutina( updateRutina: Rutinas) {
        try {
          const {_id, ...updateRutine} = updateRutina;
          const result = await super.update(_id as string, updateRutine);
          return result;
        } catch( ex: unknown) {
          console.log("Rutine mongodb:", (ex as Error).message);
          throw ex;
        }
      }

      public async deleteRutina( deleteRutine: Partial<Rutinas>) {
        try {
          const {_id } = deleteRutine;
          const result = await super.delete(_id as string);
          return result;
        } catch( ex: unknown) {
          console.log("Rutine mongodb:", (ex as Error).message);
          throw ex;
        }
      }


}