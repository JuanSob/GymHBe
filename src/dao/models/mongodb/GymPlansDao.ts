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
}