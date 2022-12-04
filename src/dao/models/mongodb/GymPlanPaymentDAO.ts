import { IGymPlanPayment } from "../entities/GymPlanPayment";
import { AbstractDao } from "./AbstractDao";
import { Db, ObjectId } from "mongodb";

export class GymPlanPaymentDao extends AbstractDao<IGymPlanPayment>{
    public constructor(db:Db){
        super('GymPlanPayment', db);
    }

    insertNewPayment(GymPlanPayment:IGymPlanPayment,  userId: string){
        try{
            const {_id, ...newPayment} = GymPlanPayment;
            newPayment.userId = new ObjectId(userId);
            return this.createOne(newPayment);
        }
        catch(ex:unknown){
            console.log("GymPlanPaymentDao mongodb:", (ex as Error).message);
			throw ex;
        }
    }

    getUserLastPayment(id:string){
        return super.findOneByFilter({userId: new ObjectId(id)}, {sort:{'date':-1}});
    }
}