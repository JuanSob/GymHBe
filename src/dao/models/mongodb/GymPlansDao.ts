import { IGymPlans } from '../entities/GymPlans';
import { AbstractDao } from './AbstractDao';
import { Db } from 'mongodb';

export class GymPlansDao extends AbstractDao<IGymPlans>{
    public constructor(db:Db){
        super('GymPlans', db);
    }

    createGymPlan(plan: IGymPlans){
        const { _id, ...newPlan } = plan;
        return this.createOne(newPlan);
    }

    public async getGymPlanByUserPaged(page:number=1, itemsPerPage: number=10){
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
			console.log("GymPlan mongodb:", (ex as Error).message);
			throw ex;
		}
	}
}