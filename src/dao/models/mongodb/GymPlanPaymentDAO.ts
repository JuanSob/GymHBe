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

    public async getUserLastPayment(id:string){
        return await super.findOneByFilter({userId: new ObjectId(id)}, {sort:{'date':-1}});
    }

    public async getUserPayment(id:string, page:number = 1, itemsPerPage: number = 10){
        try{
            const total = await super.getCollection().countDocuments({userId: new ObjectId(id)});
            const totalPages = Math.ceil(total / itemsPerPage);
            const items = await super.findByFilter(
                    {userId: new ObjectId(id)},
                    {sort:{'date':-1},
                    skip:((page-1)*itemsPerPage),
					limit:itemsPerPage});
        return {
            total,
            totalPages,
            page,
            itemsPerPage,
            items
        };
        }
        catch(ex){
            console.log("GymPlanPayment mongodb:", (ex as Error).message);
            throw ex;
        }
    }
}