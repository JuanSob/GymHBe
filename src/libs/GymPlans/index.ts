import { getConnection } from "@server/dao/models/mongodb/MongoDBConn";
import { GymPlansDao } from "@server/dao/models/mongodb/GymPlansDao";

export class GymPlans {
	private dao: GymPlansDao;
	public constructor() {
		getConnection()
			.then(conn => {
				this.dao = new GymPlansDao(conn);
			})
			.catch(ex => console.error(ex));
	}

	public async createGymPlan(name: string, description: string, price: number, beneffits: []) {
		const newPlan = {
			name,
			description,
			price: Number(price),
			beneffits
		}
		return await this.dao.createGymPlan(newPlan);
	}

	public getGymPlanByUserPaged(page: number, items: number) {
		return this.dao.getGymPlanByUserPaged(page, items);
	}
}